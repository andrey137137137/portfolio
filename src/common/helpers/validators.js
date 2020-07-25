import {
  required,
  alphaNum,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators';
// import * as regexp from "@common/constants/validation/regexp";

// export const email = helpers.regex("email", regexp.email);
// export const phone = helpers.regex("numeric", regexp.phone);
// export const password = helpers.regex("alphaNum", regexp.password);
// export const emailPhone = () => email || phone;
export const checked = helpers.withParams(
  { type: 'checked' },
  value => !helpers.req(value) || value === true,
);

export const userAlphaNumValids = {
  required,
  alphaNum,
  minLength: minLength(6),
  maxLength: maxLength(16),
};
