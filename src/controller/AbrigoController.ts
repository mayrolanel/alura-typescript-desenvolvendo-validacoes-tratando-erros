import { Request, Response } from "express";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../tipos/tiposAbrigo";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import EnderecoEntity from "../entities/Endereco";

export default class AbrigoController {
    constructor(private repository: AbrigoRepository) { }

    async criAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const { nome, celular, email, senha, endereco } = <AbrigoEntity>(
            req.body
        );

        const novoAbrigo = new AbrigoEntity(
            nome, celular, email, senha, endereco
        );

        await this.repository.criaAbrigo(novoAbrigo);
        return res
            .status(201)
            .json({ data: { id: novoAbrigo.id, nome, celular, email, endereco } });
    }

    async listaAbrigos(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const listaDeAbrigos = await this.repository.listaAbrigos();
        const data = listaDeAbrigos.map((abrigo) => {
            return {
                id: abrigo.id,
                nome: abrigo.nome,
                celular: abrigo.celular,
                email: abrigo.email,
                endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
            };
        });
        return res.status(200).json({ data });
    }

    async atualizaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

        return res.sendStatus(204);
    }

    async deletaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;

        await this.repository.deletaAbrigo(Number(id));

        return res.sendStatus(204);
    }

    async atualizaEnderecoAbrigo(req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>, res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;

        await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);

        return res.sendStatus(204);
    }


}
