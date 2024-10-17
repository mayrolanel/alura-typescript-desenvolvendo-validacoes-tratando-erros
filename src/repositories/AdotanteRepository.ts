import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";
import { RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}

  private async verificaCelularAdotante(celular: string) {
    return await this.repository.findOne({ where: { celular }})
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    const celularExiste = await this.verificaCelularAdotante(adotante.celular);

    if(celularExiste) {
      throw new RequisicaoRuim("Celular já cadastrado.")
    }
    this.repository.save(adotante);
  }
  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity
  ) {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        throw new RequisicaoRuim("Adotante não encontrado")
      }

      Object.assign(adotanteToUpdate, newData);

      await this.repository.save(adotanteToUpdate);

      return { success: true };
  }

  async deletaAdotante(
    id: number
  ) {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });

      if (!adotanteToRemove) {
        return { success: false, message: "Adotante não encontrado" };
      }

      await this.repository.remove(adotanteToRemove);

      return { success: true };
    } catch (error) {
      // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o adotante.",
      };
    }
  }

  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity
  ) {
    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      return { success: false, message: "Adotante não encontrado" };
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);
    return { success: true };
  }
}
