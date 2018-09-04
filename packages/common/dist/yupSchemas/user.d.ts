import * as yup from 'yup';
export declare const emailNotLongEnough = "email must be at least 3 characters";
export declare const passwordNotLongEnough = "password must be at least 3 characters";
export declare const invalidEmail = "email must be a valid email";
export declare const invalidLogin = "invalid login";
export declare const confirmEmailError = "please confirm your email";
export declare const forgotPasswordLockedError = "account is locked";
export declare const registerPasswordValidation: yup.StringSchema;
export declare const validUserSchema: yup.ObjectSchema<{}>;
export declare const loginSchema: yup.ObjectSchema<{}>;
export declare const changePasswordSchema: yup.ObjectSchema<{}>;