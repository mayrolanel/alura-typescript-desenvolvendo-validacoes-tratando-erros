import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import EnderecoEntity from "../../entities/Endereco";

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
})

const middlewareValidateBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schemaBodyEndereco.validate(req.body, {
            abortEarly: false,
        });

        return next();
    } catch (error) {
        const yupErrors = error as yup.ValidationError;
        const validationErros: Record<string, string> = {};

        yupErrors.inner.forEach((error) => {
            if (!error.path) return;
            validationErros[error.path] = error.message
        })

        return res.status(400).json({ error: validationErros })
    }
}

export { middlewareValidateBodyEndereco }