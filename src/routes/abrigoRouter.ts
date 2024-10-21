import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidateBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaId } from "../middleware/validadores/verificaId";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoController from "../controller/AbrigoController";
import { middlewareValidateBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
const router = express.Router();
const abrigoRepository = new AbrigoRepository(
    AppDataSource.getRepository("AbrigoEntity")
);
const abrigoController = new AbrigoController(abrigoRepository);
const validateBodyAbrigo: RequestHandler = (req, res, next) => middlewareValidateBodyAbrigo(req, res, next)
const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidateBodyEndereco(req, res, next)

router
    .post("/", validateBodyAbrigo, (req, res) => abrigoController.criAbrigo(req, res))
    .get("/", (req, res) => abrigoController.listaAbrigos(req, res))
    .put("/:id", verificaId, (req, res) => abrigoController.atualizaAbrigo(req, res))
    .delete("/:id", verificaId, (req, res) => abrigoController.deletaAbrigo(req, res))
    .patch("/:id", verificaId, validateBodyEndereco, (req, res) => abrigoController.atualizaEnderecoAbrigo(req, res));

export default router;
