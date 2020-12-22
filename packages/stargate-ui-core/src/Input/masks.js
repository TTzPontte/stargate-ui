export const zipCodeMask = (e) => {
  e.currentTarget.maxLength = 9;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  e.currentTarget.value = value;
  return e;
};

export const currencyMask = (e) => {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = `R$ ${value}`;
  return e;
};

export const cpfMask = (e) => {
  let value = e.currentTarget.value;
  e.currentTarget.maxLength = 11;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  e.currentTarget.value = value;
  return e;
};

export const cnpjMask = (e) => {
  let value = e.currentTarget.value;
  e.currentTarget.maxLength = 14;
  value = value.replace(/\D/g, '');

  value = value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );

  e.currentTarget.value = value;
  return e;
};

export const ageMask = (e) => {
  let value = e.currentTarget.value;

  e.currentTarget.maxLength = 2;
  value = value.replace(/\D/g, '');

  e.currentTarget.value = value;
  return e;
};

export const phoneMask = (e) => {
  let value = e.currentTarget.value;

  e.currentTarget.maxLength = 11;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  e.currentTarget.value = value;

  return e;
};

export const handleMask = (e, mask, setValue) => {
  if (mask) {
    switch (mask) {
      case 'zipCode':
        zipCodeMask(e);
        setValue(e.currentTarget.value);
        break;
      case 'cpf':
        cpfMask(e);
        setValue(e.currentTarget.value);
        break;
      case 'phone':
        phoneMask(e);
        setValue(e.currentTarget.value);
        break;
      case 'age':
        ageMask(e);
        setValue(e.currentTarget.value);
        break;
      case 'currency':
        currencyMask(e);
        setValue(e.currentTarget.value);
        break;
      case 'cnpj':
        cnpjMask(e);
        setValue(e.currentTarget.value);
        break;
      default:
        console.log(`Sorry, we are out of ${mask}s.`);
    }
  }
};
