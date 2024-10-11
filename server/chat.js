// import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { RunnableWithMessageHistory } from "@langchain/core/runnables";
// import { ChatMistralAI } from "@langchain/mistralai";

// const model = new ChatMistralAI({
//   model: "mistral-large-latest",
//   temperature: 0,
//   apiKey: ""
// });

// const messageHistories= {};

// const prompt = ChatPromptTemplate.fromMessages([
//   [
//     "system",
//     `You are a helpful assistant who remembers all details the user shares with you.`
//   ],
//   ["placeholder", "{chat_history}"],
//   ["human", "{input}"]
// ]);

// const chain = prompt.pipe(model);

// const withMessageHistory = new RunnableWithMessageHistory({
//   runnable: chain,
//   getMessageHistory: async (sessionId) => {
//     if (messageHistories[sessionId] === undefined) {
//       messageHistories[sessionId] = new InMemoryChatMessageHistory();
//     }
//     return messageHistories[sessionId];
//   },
//   inputMessagesKey: "input",
//   historyMessagesKey: "chat_history"
// });

// const config = {
//   configurable: {
//     sessionId: "user-session"
//   }
// };

// let userInput = "Hi, I'm Nehal.";
//   let response = await withMessageHistory.invoke(
//     {
//       input: userInput
//     },
//     config
//   );
//   console.log(response.content);

//   userInput = "What's my name?";
//   response = await withMessageHistory.invoke(
//     {
//       input: userInput
//     },
//     config
//   );
//   console.log(response.content);

// // async function runChatbot() {
// //   const config = {
// //     configurable: {
// //       sessionId: "user-session"
// //     }
// //   };

// //   let userInput = "Hi, I'm Nehal.";
// //   let response = await withMessageHistory.invoke(
// //     {
// //       input: userInput
// //     },
// //     config
// //   );
// //   console.log(response.content);

// //   userInput = "What's my name?";
// //   response = await withMessageHistory.invoke(
// //     {
// //       input: userInput
// //     },
// //     config
// //   );
// //   console.log(response.content);

// //   userInput = "Tell me a joke.";
// //   const stream = await withMessageHistory.stream(
// //     {
// //       input: userInput
// //     },
// //     config
// //   );

// //   for await (const chunk of stream) {
// //     console.log(chunk.content);
// //   }
// // }

// // runChatbot()
// // const config = {
// //     configurable: {
// //         sessionId: "user-session"
// //     }
// // };

// // const userInput = "what's my name";
// // const stream = await withMessageHistory.stream(
// //     {
// //     input: userInput
// //     },
// //     config
// // );

// // for await (const chunk of stream) {
// //     console.log(chunk.content);
// //   }


// //llm agent


// // import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
// // import { ChatPromptTemplate } from "@langchain/core/prompts";
// // import { RunnableWithMessageHistory } from "@langchain/core/runnables";
// // import { ChatMistralAI } from "@langchain/mistralai";



// // const model = new ChatMistralAI({
// //     model: "mistral-large-latest",
// //     temperature: 0,
// //     apiKey: "PlVXCju1tt4yp9PHsIweNCwPzGGWXy82"
// //   });
  
// //   const messageHistories = {};
  
// //   const prompt = ChatPromptTemplate.fromMessages([
// //     [
// //       "system",
// //       `
// //         You are an experienced teacher specializing in data structures and algorithms. Your goal is to guide the student through the learning process using a Socratic method, rather than simply providing the answers. 
  
// //         Your teaching philosophy is to ask thoughtful questions that nudge the student towards the correct solution, rather than directly telling them the answer. You aim to help the student develop their problem-solving skills and critical thinking, not just memorize the material.
  
// //         If the student proposes a solution that is space or time-inefficient, you should point out the inefficiencies and ask the student questions to help them improve the solution, rather than immediately providing the optimal solution.
  
// //         Your tone should be patient, encouraging, and helpful. You want the student to feel supported and empowered to solve the problems on their own, with your guidance.
  
// //         Remember, your role is to facilitate the student's learning, not simply to provide the answers.
// //       `
// //     ],
// //     ["placeholder", "{chat_history}"],
// //     ["human", "{input}"]
// //   ]);
  
// //   const chain = prompt.pipe(model);
  
// //   const withMessageHistory = new RunnableWithMessageHistory({
// //     runnable: chain,
// //     getMessageHistory: async (sessionId) => {
// //       if (messageHistories[sessionId] === undefined) {
// //         messageHistories[sessionId] = new InMemoryChatMessageHistory();
// //       }
// //       return messageHistories[sessionId];
// //     },
// //     inputMessagesKey: "input",
// //     historyMessagesKey: "chat_history"
// //   });
  
// //     const config = {
// //       configurable: {
// //         sessionId: "1"
// //       }
// //     };

    
// //     const response = await withMessageHistory.invoke(
// //       {
// //         input: "what is my name?"
// //       },
// //       config
// //     );

// //     console.log(response.content)

  
//   // app.post('/chat', async (req, res) => {
//   //   const { sessionId, message } = req.body;
  
//   //   const config = {
//   //     configurable: {
//   //       sessionId
//   //     }
//   //   };
  
//   //   const response = await withMessageHistory.invoke(
//   //     {
//   //       input: message
//   //     },
//   //     config
//   //   );
  
//   //   res.json({ response: response.content });
//   // });
  
//   // console.log(messageHistories)
  
//   // app.listen(port, () => {
//   //   console.log(`Server is running on port ${port}`);
//   // });
  
  

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    temperature: 0,
    apiKey: "AIzaSyB75kXU5OSZBp4oycOnjk-uavpJgg537yI"
  });
  


const TimeComplexityLLM = async() => {
    try{

      let prompt =  "class Solution:\n    def reportSpam(self, message: List[str], bannedWords: List[str]) -> bool:\n        h = Counter(message)\n        s = Counter(bannedWords)\n        count = 0\n        for key, val in s.items():\n            if h[key]:\n                count += h[key]\n\n        return True if count >= 2 else False"
        
          
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
      console.log(result)
    //   const response = await result.response;
    //   const text = response.text();   
    //   res.json({ response: text });
  
  
    }catch(error){
      console.error('Error generating content:', error);
    }
  }

  console.log(TimeComplexityLLM())