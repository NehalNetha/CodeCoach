
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import dotenv from "dotenv"
dotenv.config()

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY
});

const messageHistories = {};

const prompt = ChatPromptTemplate.fromMessages([
  [
      "system",
      `
      You are an experienced teacher in data strucutres and algorithms. Your purpose is to teach the user and help students solving DSA. You're being integrated in 
      a socatric dsa learning application. Your sole purpose is to help the student get the answer rather than giving the answer outright. If the student asks you for help
      don't give the answer, ask questions to let him think about the solution. Be breif in your responses, and help the student learn the process.
      the first prompt that is sent to you is for you to understand the problem that the student is working on, so please just tell the user that you know what problem he's working on, when the application sent you the problem description, and then start helping when the user asks for the help.Produce the answer in markdwon format.
      `

      
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"]
]);


const chain = prompt.pipe(model);
const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
      if (messageHistories[sessionId] === undefined) {
        messageHistories[sessionId] = new InMemoryChatMessageHistory();
      }
      return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history"
});

const AskLlm =  async (req, res ) => {
    const {sessionId, question} = req.body
    const config = {
        configurable: {
            sessionId
        }
    };


    const response = await withMessageHistory.invoke(
      {
        input: question
      },
      config
    );
  

    res.json({ response: response.content });
}

const TimeComplexityLLM = async(req, res) => {
  try{
    let {prompt} = req.body
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }   
    prompt = prompt + `you're given a code, the only thing you need to do is to return the time complexity of the word,
      'O(1)': 'constant',
      'O(log n)': 'logarithmic',
      'O(n)': 'linear',
      'O(n log n)': 'linearithmic',
      'O(n^2)': 'quadratic',
      'O(2^n)': 'exponential'
      the above are the only time complexities, you can return, return it just one word, just the time complexity nothing else, 
      for exmpale if the code is O(1) you should return just O(1) nothing else, just the word.
    `
    const result = await model.invoke(prompt);
    res.json({"complexity": result.content});
  }catch(error){
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
}

const CodeReview = async(req, res) => {
  try{
    const  {question} = req.body 
    if (!question){
      return res.status(400).json({ error: 'Prompt is required' });
    }
   

    const prompt = `${question}

    You're given a coding problem and its solution. Your task is to provide a code review. Analyze the following aspects:
    
    1. Time complexity
    2. Space complexity
    3. Code readability
    4. Potential improvements
    5. Related topics for further study
    
    Respond ONLY with a valid JSON object in the following format, with no additional text before or after:
    
    {
      "timeComplexity": "Analyze and explain the time complexity",
      "spaceComplexity": "Analyze and explain the space complexity",
      "differentMethods": "Suggest different ways to implement the solution",
      "codeReview": "Comment on code readability, conciseness, and overall quality",
      "topics": "List related topics for further study"

    }
    don't specity infront of the json response, that it is a json by starting the reponse with json, nothing should be there infront or at the end of the 
    response. just the brackets, whatever json i specified and end bracket.  
    `;
    
    const result = await model.invoke(prompt)
    res.json({"response": result.content})
  }catch(error){
    console.error('Error generating content:', error);

    res.status(500).json({ error: 'An error occurred while generating content' });
  }
}

export {AskLlm, TimeComplexityLLM, CodeReview}