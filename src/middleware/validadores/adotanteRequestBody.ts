import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

yup.setLocale(pt)

const schemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "celular invalido"),
    senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm),
    foto: yup.string().optional(),
})

const middlewareValidateBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schemaBodyAdotante.validate(req.body, {
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

export { middlewareValidateBodyAdotante }