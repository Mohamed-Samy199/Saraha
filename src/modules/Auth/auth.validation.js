import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const signupSchema = {
    body : joi.object({
        userName : joi.string().alphanum().required(),
        email : generalFields.email,
        password : generalFields.password,
        cpassword : generalFields.cpassword
    }).required()
}

export const signinSchema = {
    body : joi.object({
        email : generalFields.email,
        password : generalFields.password,
    }).required()
}