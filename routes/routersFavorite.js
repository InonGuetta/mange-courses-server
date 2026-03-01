import express from "express";
import { addFavorite, removeFavorite, getAllFavorite, getAllFavoriteByUser } from "../controllers/controllersFavorite.js";

const routerFavorite = express.Router();

routerFavorite.get("/get-all-favorites", getAllFavorite);
routerFavorite.get("/get-favorites-by-student/:userId", getAllFavoriteByUser);
routerFavorite.post("/add-favorite/:id", addFavorite);
routerFavorite.delete("/delete-favorite/:id", removeFavorite);

export default routerFavorite;
