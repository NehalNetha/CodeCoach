

import {Router} from "express"
import GetProblemById, { GetProblems } from "../controllers/problems.js";

const router = Router();

router.get("/problems/:id", GetProblemById)
router.get("/problems", GetProblems)


export default router