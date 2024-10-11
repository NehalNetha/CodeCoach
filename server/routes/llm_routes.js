import { Router } from "express";
import { AskLlm, CodeReview, TimeComplexityLLM } from "../controllers/llm_controller.js";

const llmRouter = Router()

llmRouter.post("/llm/ask-llm", AskLlm)
llmRouter.post("/llm/time-complexity", TimeComplexityLLM)
llmRouter.post("/llm/code-review", CodeReview)

export default llmRouter