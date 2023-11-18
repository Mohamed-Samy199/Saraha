import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const passwordValidate = {
    body : joi.object({
        oldPassword : generalFields.password,
        newPassword : generalFields.password.invalid(joi.ref('oldPassword')),
        cpassword : generalFields.cpassword.valid(joi.ref('newPassword'))
    }).required()
}
export const profileValidate = {
    params : joi.object({
        id : generalFields.id
    }).required()
}