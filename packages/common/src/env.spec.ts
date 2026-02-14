import { describe, expect, it } from 'vitest';

import { envVarToBoolean } from './env.js';

describe('envVarToBoolean', () => {
  it('should return true for 1', () => {
    expect(envVarToBoolean('1')).toBe(true);
  });

  it('should return true for true', () => {
    expect(envVarToBoolean('true')).toBe(true);
  });

  it('should return false for 0', () => {
    expect(envVarToBoolean('0')).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(envVarToBoolean(undefined)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(envVarToBoolean('')).toBe(false);
  });
});
