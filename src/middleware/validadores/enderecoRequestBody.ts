import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import EnderecoEntity from "../../entities/Endereco";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt)

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
})

const middlewareValidateBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(schemaBodyEndereco, req, res, next);
}

export { middlewareValidateBodyEndereco }