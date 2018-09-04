"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.emailNotLongEnough = 'email must be at least 3 characters';
exports.passwordNotLongEnough = 'password must be at least 3 characters';
exports.invalidEmail = 'email must be a valid email';
exports.invalidLogin = 'invalid login';
exports.confirmEmailError = 'please confirm your email';
exports.forgotPasswordLockedError = 'account is locked';
exports.registerPasswordValidation = yup
    .string()
    .min(3, exports.passwordNotLongEnough)
    .max(255)
    .required();
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    password: yup
        .string()
        .min(3, exports.passwordNotLongEnough)
        .max(255)
        .required()
});
exports.loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.invalidLogin)
        .max(255, exports.invalidLogin)
        .email(exports.invalidLogin)
        .required(),
    password: yup
        .string()
        .min(3, exports.invalidLogin)
        .max(255, exports.invalidLogin)
        .required()
});
exports.changePasswordSchema = yup.object().shape({
    newPassword: exports.registerPasswordValidation
});
//# sourceMappingURL=user.js.map