import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { licensedEnum } from '../../enums/licensedEnum';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            cpf: Joi.string().trim().required(),
            birthDate: Joi.date().min(18).required(),
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(6).trim().required(),
            licensed: Joi.string().valid(...Object.values(licensedEnum)).required()
        });
        const { error } = await schema.validate(req.body, { abortEarly: true });
        if (error) throw error
        return next();
    }
    catch (erro) {
        return res.status(400).json(
            erro.details.map((detail: any) => ({
                message: detail.message,
                path: detail.path
            }))
        )
    }
}