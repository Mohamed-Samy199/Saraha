import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const messageValidite = {
    body : joi.object({
        message : joi.string().pattern(new RegExp('^[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\";$^%{}?]{1,1200}$')).min(3).max(1500).required(),
    }).required(),
    params : joi.object({
        recevierId : joi.string().min(24).max(24).required()
    }).required()
}

export const messageDeleted = {
    params : joi.object({
        id : generalFields.id
    }).required()
}