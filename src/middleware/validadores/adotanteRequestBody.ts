import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt)

const schemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "celular invalido"),
    senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm),
    foto: yup.string().optional(),
})

const middlewareValidateBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(schemaBodyAdotante, req, res, next);
}

export { middlewareValidateBodyAdotante }