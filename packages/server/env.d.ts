declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECTION_STR: string;
      /**
       * If set, use an in-memory MongoDB instance will be used instead of the regular DB.
       *
       * The `MONGO_CONNECTION_STR` env variable will be ignored.
       */
      USE_IN_MEMORY_DB?: string;
    }
  }
}

export {};
