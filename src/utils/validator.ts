export const regexValidatePhoneNumber = () => {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
};

export const regexValidatePassword = () => {
  return /^.{8,}$/;
};

export const regexValidateEmail = () => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
};
