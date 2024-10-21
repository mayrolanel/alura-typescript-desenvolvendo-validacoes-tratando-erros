import express, { RequestHandler } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidateBodyPet } from "../middleware/validadores/petRequestBody";
import { verificaId } from "../middleware/validadores/verificaId";
const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) => middlewareValidateBodyPet(req, res, next)

router.post("/",validateBodyPet , (req, res) => petController.criaPet(req, res));
router.get("/", (req, res) => petController.listaPet(req, res));
router.put("/:id", verificaId, (req, res) => petController.atualizaPet(req, res));
router.delete("/:id", verificaId, (req, res) => petController.deletaPet(req, res));
router.put("/:pet_id/:adotante_id", verificaId, (req, res) =>
  petController.adotaPet(req, res)
);
router.get("/filtro", (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res)
);

export default router;
