import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidateBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { middlewareValidateBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/validadores/verificaIdMiddleware";
const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);
const validateBodyAdotante: RequestHandler = (req, res, next) => middlewareValidateBodyAdotante(req, res, next)
const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidateBodyEndereco(req, res, next)

router.post("/", validateBodyAdotante,  (req, res) => adotanteController.criaAdotante(req, res));

router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));

router.put("/:id", verificaIdMiddleware, (req, res) => adotanteController.atualizaAdotante(req, res));

router.delete("/:id", verificaIdMiddleware,  (req, res) =>
  adotanteController.deletaAdotante(req, res)
);

router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) =>
  adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;
