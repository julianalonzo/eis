export const isRequired = value => {
  if (value) {
    return undefined;
  }

  return 'This field is required';
};
