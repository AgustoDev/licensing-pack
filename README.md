## Agusto Licensing Package

This package is a simple licensing package for Agusto & Co products. This is not meant to be used by anyone else but Agusto & Co.

### Installation

```
npm install @Agustocoltd/licensing-pack

OR

yarn add @Agustocoltd/licensing-pack
```

### Usage

```
import { licenseGenerator } from '@agustocoltd/licensing-pack';

const license = licenseGenerator.encryptLicense({
  name: 'Company Name',
  startDate: 'start date',
  endDate:"end date",
  gracePeriod: 'grace period',
})

// license is a string that can be saved in a database or a file
```

### Testing

To execute tests for the library, install the project dependencies once:

```
npm install
```

Then, run the tests:

```
npm test
```

To see the test coverage, run:

```
npm run test:coverage
```

### License

© Copyright Agusto & Co. 2023
