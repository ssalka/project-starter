import { defineAbility, type MongoAbility } from '@casl/ability';
import { accessibleBy } from '@casl/mongoose';
import is from '@sindresorhus/is';
import { memoize, pick } from 'lodash-es';
import { model, Schema, type HydratedDocument, type Model, type Types } from 'mongoose';

import type { Timestamps } from '@ssalka/common/types/mongo';
import { UserRole } from '@ssalka/common/types/user';

// Base schema interface - only fields that are actually stored in the database
export interface UserSchema extends Timestamps {
  _id: Types.ObjectId;
  name: string;
  email?: string;
  role: `${UserRole}`;
}

interface UserStatics {
  findByName(name: string): Promise<UserDocument>;
  findOrCreate(user: Pick<UserSchema, 'name' | 'email' | 'role'>): Promise<UserDocument>;
}

interface UserMethods {
  /**
   * Used in MongoDB queries to determine if a given object is accessible to the user.
   * If you need a boolean result to indicate if a user has a given permission, use `user.can(action, 'type')` instead.
   */
  accessibleQuery(action: string, type: string): Record<string, unknown>;
  /**
   * Checks whether the user has permission to perform an action on an object.
   * For MongoDB queries, use `user.accessibleQuery(action, type)` instead.
   */
  can<T extends {}>(action: string, object: string | T): boolean;
}

interface UserVirtuals {
  /**
   * @internal Intended as a private getter for checking permissions
   *
   * Instead, use `user.can(action, object)`
   */
  ability: MongoAbility;
}

// Complete document type including stored fields, methods, and virtuals
export type UserDocument = HydratedDocument<UserSchema, UserMethods, {}, UserVirtuals>;

// Complete model interface
interface UserMongooseModel extends Model<UserSchema, {}, UserMethods, UserVirtuals>, UserStatics {}

const getCachedAbilityForUser = memoize((user: UserSchema) =>
  defineAbility(can => {
    if (user.role === 'admin') {
      can('manage', 'all');

      return;
    }

    // Generic CRUD: users can manage resources they created
    can('create', 'all', '*', { createdBy: user._id });
    can('access', 'all', '*', { createdBy: user._id });
    can('update', 'all', '*', { createdBy: user._id });
    can('delete', 'all', '*', { createdBy: user._id });
  }),
);

const userSchema = new Schema<UserSchema, UserMongooseModel, UserMethods, {}, UserVirtuals>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },
  },
  {
    // Automatically set and update `createdAt`/`updatedAt` fields
    timestamps: true,

    // Static methods on the User model
    statics: {
      async findByName(name) {
        const user = await this.findOne({ name }).orFail();

        return user;
      },

      async findOrCreate(user) {
        const userData = pick(user, ['name', 'email']);
        const foundUser = await this.findOneAndUpdate(userData, userData, {
          upsert: true,
          // return the user document *after* the update
          new: true,
        });

        return foundUser;
      },
    },

    // Methods on instances of the User model
    methods: {
      can(action, object) {
        if (is.string(object)) {
          return this.ability.can(action, object);
        }

        return this.ability.can(action, object);
      },
      accessibleQuery(action: string, type: string) {
        return accessibleBy(this.ability, action).ofType(type);
      },
    },

    // Fields not stored in the database
    virtuals: {
      ability: {
        get() {
          return getCachedAbilityForUser(this);
        },
      },
    },
  },
);

export const User = model<UserSchema, UserMongooseModel>('User', userSchema);
