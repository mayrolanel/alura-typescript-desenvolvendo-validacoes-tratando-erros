import AbrigoEntity from "../entities/AbrigoEntity";

type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

type TipoRequestParamsAbrigo = { id?: string };

type TipoResponseBodyAbrigo = {
  data?:
    | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">
    | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">[];
};

export {
  TipoRequestBodyAbrigo,
  TipoResponseBodyAbrigo,
  TipoRequestParamsAbrigo,
};