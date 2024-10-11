import express, { request } from "express"
import { VM } from "vm2";
import cors from 'cors';


import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMistralAI } from "@langchain/mistralai";
import router from "./routes/problem_routes.js";
import testProblemRouter from "./routes/testProblem_routes.js";
import llmRouter from "./routes/llm_routes.js";
import connectDB from "./database/database.js";
import internalRouter from "./routes/internalProblems_routes.js";
import session from 'express-session';


import dotenv from 'dotenv';
import authRouter, { passport } from "./controllers/auth_controller.js";
import MongoStore from "connect-mongo";
dotenv.config();



const app = express()
const port = 3003; // or any port you prefer
const hostname = 'localhost';

app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://nihalnetha249:G3xPluCK3hJnlF0m@cluster0.h1rxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    autoRemove: 'native' // Default
  })
 
}));


const corsOptions = {
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true, 
  };


app.use(cors(corsOptions));

app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());
connectDB();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/", authRouter)


app.get('/api/auth/status', (request, response ) => {
  if (request.isAuthenticated()) {
    response.json({ isAuthenticated: true, user: request.user });
  } else {
    response.json({ isAuthenticated: false });
  }
});

app.get("/api/auth/details", (request, response) => {
  if (request.isAuthenticated()) {
    response.json(request.user);
  } else {
    response.status(401).json({ message: 'Not authenticated' });
  }
});




app.use("/", router)
app.use("/", testProblemRouter)
app.use("/", llmRouter)
app.use("/", internalRouter)






  
app.listen(port, hostname, function () {
console.log(`Server running at http://${hostname}:${port}/`);
});