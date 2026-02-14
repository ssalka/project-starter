import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { UserRole } from '@ssalka/common/types/user';

import { connectToDatabase, disconnectFromDatabase } from '../connect.js';
import { User, type UserDocument } from './User.js';

describe('User', () => {
  beforeAll(connectToDatabase, 60000);
  afterAll(disconnectFromDatabase);

  describe('accessibleQuery', () => {
    let user: UserDocument;
    beforeAll(async () => {
      user = (await User.create({ name: 'user' })) as unknown as UserDocument;
    });

    it('generates correct query for accessing resources', () => {
      expect(user.accessibleQuery('access', 'Resource')).toEqual({
        $or: [{ createdBy: user._id }],
      });
    });

    it('generates correct query for creating resources', () => {
      expect(user.accessibleQuery('create', 'Resource')).toEqual({
        $or: [{ createdBy: user._id }],
      });
    });
  });

  describe('User.can', () => {
    it('admin can perform any action', async () => {
      const admin = await User.create({ name: 'admin-user', role: UserRole.Admin });

      expect(admin.can('manage', 'all')).toBe(true);
    });

    it('checks permission on subject string', async () => {
      const user = await User.create({ name: 'test-user' });

      expect(user.can('access', 'all')).toBe(true);
    });
  });
});
