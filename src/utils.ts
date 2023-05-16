import CryptoJS from 'crypto-js';

export interface encryptDataProps {
  name: string;
  startDate: number;
  endDate: number;
  gracePeriod?: number;
  modules?: string[];
}

const randomGenerator = (length: number) => {
  let characters = 'abcdefghijklmnopqrstuvwxyz123456789';
  let res = '';
  for (var i = 0; i < length; i++) {
    let r = characters.split('')[Math.floor(Math.random() * (characters.length - 1))];
    res += r;
  }
  return res;
};

export const encrypt = ({ gracePeriod = 0, ...payload }: encryptDataProps) => {
  try {
    if (!payload.name || !payload.startDate || !payload.endDate) throw new Error('Invalid payload');

    const hashKey: any = randomGenerator(55);
    const secret: any = randomGenerator(9);

    const payloadString = JSON.stringify({ ...payload, gracePeriod }, null, '\t');
    const encryptedData = CryptoJS.AES.encrypt(payloadString, secret).toString();
    const newKeyString = `${secret}${hashKey.substr(0, 30)}${encryptedData}${hashKey.substr(31, hashKey.length - 1)}${
      secret.length
    }`;
    return { data: newKeyString };
  } catch (error: any) {
    return { error, errorMessage: error.message };
  }
};

const decrypt = (licensingKey: string) => {
  let response = { data: null, error: null, errorMessage: null };
  try {
    let l: any = licensingKey.charAt(licensingKey.length - 1);
    let h = parseInt(l) + 30;
    let s = licensingKey.substring(0, l);
    let d: any = licensingKey.slice(h, licensingKey.length - 1);

    d = CryptoJS.AES.decrypt(d, s);
    d = d.toString(CryptoJS.enc.Utf8);

    let r: encryptDataProps = JSON.parse(d);
    return { ...response, data: r };
  } catch (error: any) {
    return { ...response, error, errorMessage: error.message };
  }
};

export const LicenseGenerator = {
  encrypt,
  decrypt,
};
