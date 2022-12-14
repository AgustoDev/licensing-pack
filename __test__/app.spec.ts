import { expect, it, describe } from 'vitest';
import { licenseGenerator } from '../src/main';

const startDate = new Date().setDate(new Date().getDate() - 1);
const endDate = new Date().setDate(new Date().getDate() + 10);

const payload = {
  id: '1b518f5d-ac5d-4cd5-a93c-6130c9ecf3d3',
  name: 'Test Company',
  startDate,
  endDate,
  gracePeriod: 5,
};

describe('app', () => {
  it('should work', () => {
    expect(licenseGenerator).toBeDefined();
  });

  it('should generate a license', () => {
    const license = licenseGenerator.encrypt(payload);
    expect(license).toBeDefined();
    expect(license?.data).toBeTypeOf('string');
  });

  it('should throw an error if the payload is invalid', () => {
    const license = licenseGenerator.encrypt({} as any);
    expect(license).toBeDefined();
    expect(license?.errorMessage).toBeDefined();
  });

  it('should decrypt a license', () => {
    const { data } = licenseGenerator.encrypt(payload);
    const decrypted = licenseGenerator.decrypt(data as string);
    expect(decrypted).toBeDefined();
    expect(JSON.stringify(decrypted?.data)).toBe(JSON.stringify(payload));
  });

  it('should throw an error if the license is invalid', () => {
    const decrypted = licenseGenerator.decrypt('invalid-license');
    expect(decrypted).toBeDefined();
    expect(decrypted?.errorMessage).toBeDefined();
  });
});
