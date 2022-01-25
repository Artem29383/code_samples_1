export const formValidation = (data, step) => {
  switch (step) {
    case 1: {
      return !data.address.trim();
    }
    default: {
      return true;
    }
  }
};
