import { assert } from '@sindresorhus/is';
import type { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { isTest } from '@ssalka/common/config';
import { envVarToBoolean } from '@ssalka/common/env';

let testDb: MongoMemoryServer;

export async function connectToDatabase() {
  let uri = process.env.MONGO_CONNECTION_STR;

  if (isTest || envVarToBoolean(process.env.USE_IN_MEMORY_DB)) {
    // NOTE mongodb-memory-server is installed via devDependencies and is only available locally or in test environments
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    testDb = mongod;
  }

  try {
    assert.truthy(uri, 'Missing MongoDB connection string');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB' + (isTest ? ' (in-memory)' : ''));
  } catch (e) {
    console.error('Failed to connect to MongoDB');
    throw e;
  }
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
  if (testDb) await testDb.stop();
  console.log('Closed MongoDB connection');
}
