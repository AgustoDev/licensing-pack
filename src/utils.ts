import CryptoJS from 'crypto-js';
import { type } from 'os';

interface encryptDataProps {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  gracePeriod?: number;
}

class LicenseGenerator {
  private randomGenerator({ length = 0 }: { length: number }) {
    let characters = 'abcdefghijklmnopqrstuvwxyz123456789';
    let res = '';
    for (var i = 0; i < length; i++) {
      let r = characters.split('')[Math.floor(Math.random() * (characters.length - 1))];
      res += r;
    }
    return res;
  }

  encrypt({ gracePeriod = 0, ...payload }: encryptDataProps) {
    let response = { data: null, error: null, errorMessage: null };
    try {
      if (!payload.id || !payload.name || !payload.startDate || !payload.endDate) {
        throw new Error('Invalid payload');
      }

      let hashKey: any = this.randomGenerator({ length: 55 });
      let secret: any = this.randomGenerator({ length: 9 });

      let payloadString = JSON.stringify({ ...payload, gracePeriod }, null, '\t');
      let encryptedData = CryptoJS.AES.encrypt(payloadString, secret).toString();
      let newKeyString = `${secret}${hashKey.substr(0, 30)}${encryptedData}${hashKey.substr(31, hashKey.length - 1)}${
        secret.length
      }`;
      return { ...response, data: newKeyString };
    } catch (error: any) {
      return { ...response, error, errorMessage: error.message };
    }
  }

  decrypt(licensingKey: string) {
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
  }
}

export default LicenseGenerator;
