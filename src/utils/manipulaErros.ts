import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

class ManipulaErros extends Error{
    readonly statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }

}

class RequisicaoRuim extends ManipulaErros{
    constructor(message: string){
        super(message, EnumHttpStatusCode.BAD_REQUEST);
    }

}

class NaoEncontrado extends ManipulaErros{
    constructor(message: string){
        super(message, EnumHttpStatusCode.NOT_FOUND);
    }

}



export { ManipulaErros, RequisicaoRuim, NaoEncontrado }