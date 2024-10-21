import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepositoriy";
import AbrigoEntity from "../entities/AbrigoEntity";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
    constructor(private repository: Repository<AbrigoEntity>) { }

    private async existeAbrigoComCelular(celular: string) {
        return await this.repository.findOne({ where: { celular } })
    }

    private async existeAbrigoComEmail(email: string) {
        return await this.repository.findOne({ where: { email } })
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
        const celularExiste = await this.existeAbrigoComCelular(abrigo.celular);
        const EmailExiste = await this.existeAbrigoComEmail(abrigo.email);

        if (celularExiste || EmailExiste) {
            throw new RequisicaoRuim("Já existe um abrigo com este Celular ou email.")
        }
        this.repository.save(abrigo);
    }

    async listaAbrigos(): Promise<AbrigoEntity[]> {
        return await this.repository.find();
    }

    async atualizaAbrigo(id: number, newData: AbrigoEntity) {
        const abrigoToUpdate = await this.repository.findOne({ where: { id } });

        if (!abrigoToUpdate) {
            throw new NaoEncontrado("Abrigo não encontrado")
        }

        Object.assign(abrigoToUpdate, newData);

        await this.repository.save(abrigoToUpdate);

        return { success: true };
    }

    async deletaAbrigo(id: number) {
        try {
            const abrigoToRemove = await this.repository.findOne({ where: { id } });

            if (!abrigoToRemove) {
                throw new NaoEncontrado("Abrigo não encontrado")
            }

            await this.repository.remove(abrigoToRemove);

            return { success: true };
        } catch (error) {
            // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o adotante.",
            };
        }
    }

    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
        const abrigo = await this.repository.findOne({
            where: { id: idAbrigo },
        });

        if (!abrigo) {
            throw new NaoEncontrado("Abrigo não encontrado")
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        abrigo.endereco = novoEndereco;
        await this.repository.save(abrigo);
        return { success: true };
    }
}
