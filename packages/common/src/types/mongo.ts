export type DocumentType<T = {}> = Omit<
  { [key in keyof T]: key extends `${string}Id` ? string : T[key] },
  '_id'
> &
  Timestamps & {
    _id: string;
  };

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}
