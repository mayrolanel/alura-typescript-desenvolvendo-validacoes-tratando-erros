import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";
import { TipoRequestBodyAbrigo } from "../../tipos/tiposAbrigo";

yup.setLocale(pt)

const schemaBodyAbrigo: yup.ObjectSchema<Omit<TipoRequestBodyAbrigo, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    email: yup.string().email().defined().required(),
    celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "celular invalido"),
    senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm),
})

const middlewareValidateBodyAbrigo = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(schemaBodyAbrigo, req, res, next);
}

export { middlewareValidateBodyAbrigo }