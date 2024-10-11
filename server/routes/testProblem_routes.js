import { Router, text } from "express";
import TestProblem, { p, RunSubmittedCode } from "../controllers/testProblem_controller.js";


const testProblemRouter = Router();

testProblemRouter.post("/test_problem", TestProblem)
testProblemRouter.get("/test_problem", p)
testProblemRouter.post("/submit/:problemId", RunSubmittedCode)



export default testProblemRouter