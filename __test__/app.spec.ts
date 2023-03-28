import { describe, expect, it } from 'vitest';
import { LicenseGenerator } from '../dist/main.cjs';

const startDate = new Date().setDate(new Date().getDate() - 1);
const endDate = new Date().setDate(new Date().getDate() + 10);

export const payload = {
  name: 'Test Company Ltd',
  startDate,
  endDate,
  gracePeriod: 5,
};

describe('app', () => {
  it('should work', () => {
    expect(LicenseGenerator).toBeDefined();
  });

  it('should generate a license', () => {
    const { data, error, errorMessage } = LicenseGenerator.encrypt(payload);
    console.log({ data, error, errorMessage });
    expect(data).toBeDefined();
    expect(data).toBeTypeOf('string');
  });

  it('should throw an error if the payload is invalid', () => {
    const license = LicenseGenerator.encrypt({} as any);
    expect(license).toBeDefined();
    expect(license?.errorMessage).toBeDefined();
  });

  it('should decrypt a license', () => {
    const { data } = LicenseGenerator.encrypt(payload);
    const decrypted = LicenseGenerator.decrypt(data as string);
    console.log({ decrypted });
    expect(decrypted).toBeDefined();
    expect(decrypted?.data?.name).toBe(payload.name);
    expect(decrypted?.data?.startDate).toBe(payload.startDate);
    expect(decrypted?.data?.endDate).toBe(payload.endDate);
    expect(JSON.stringify(decrypted?.data)).toBe(JSON.stringify(payload));
  });

  it('should throw an error if the license is invalid', () => {
    const decrypted = LicenseGenerator.decrypt('invalid-license');
    expect(decrypted).toBeDefined();
    expect(decrypted?.errorMessage).toBeDefined();
  });
});
