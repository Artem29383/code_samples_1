import { Frequency } from 'models/properties/types';

export default (feeValue: number, frequency: Frequency) => {
  switch (frequency) {
    case 'Annually': {
      return feeValue / 12;
    }
    case 'BiMonthly': {
      return feeValue / 2;
    }
    case 'SemiMonthly': {
      return feeValue * 2;
    }
    case 'Daily': {
      return feeValue * 31;
    }
    case 'Monthly': {
      return feeValue;
    }
    case 'Quarterly': {
      return feeValue / 3;
    }
    case 'Seasonal': {
      return feeValue / 3;
    }
    case 'SemiAnnually': {
      return feeValue / 6;
    }
    case 'Weekly': {
      return feeValue * 4;
    }

    default: {
      return 0;
    }
  }
};
