import type { Document, Types } from 'mongoose';

import type { DocumentType } from '@ssalka/common/types/mongo';

export type ObjectId = Types.ObjectId;

type ToDocumentType<T> = DocumentType<
  T extends Document<unknown, unknown, infer DocType> ? DocType : never
>;

/**
 * Converts a Mongoose document to its plain object representation,
 * preserving the return type of the document's toJSON method.
 */
export function toJSON(doc: null): null;
export function toJSON<T extends Document>(doc: T): ToDocumentType<T>;
export function toJSON<T extends Document>(doc: T | null): ToDocumentType<T> | null {
  if (doc === null) return null;

  return doc.toJSON({ flattenObjectIds: true }) as ToDocumentType<T>;
}

// Populated type: keeps Document and removes ObjectId from specified keys
export type Populated<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? Exclude<T[P], Types.ObjectId> : T[P];
};

// Recursive type to handle single or array ref fields
type UnpopulatedField<T, Doc> = T extends (infer U)[]
  ? UnpopulatedField<U, Doc>[] // Handle arrays of ref fields
  : T extends Types.ObjectId | Doc
    ? Extract<T, Types.ObjectId> // Handle single ref fields
    : T; // Leave other fields unchanged

// Unpopulated type: converts all ref fields to just ObjectId, handling arrays as well
export type Unpopulated<T> = {
  [P in keyof T]: UnpopulatedField<T[P], T>;
};

export function isPopulated<T, K extends Extract<keyof T, string>>(
  doc: Document<unknown, {}, T>,
  keys: K[],
): doc is Document<unknown, {}, Populated<T, K>> {
  return keys.every(key => doc.populated(key));
}
