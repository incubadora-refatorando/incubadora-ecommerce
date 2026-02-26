import { Router } from "express";
import {
	add,
	getCart,
	update,
	remove,
	clear,
} from "../controllers/cartController";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.post("/add", isAuthenticated, add);
router.get("/", isAuthenticated, getCart);
router.delete("/", isAuthenticated, clear);
router.put("/:id", isAuthenticated, update);
router.delete("/:id", isAuthenticated, remove);

export default router;
