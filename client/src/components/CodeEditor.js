import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Lightbulb } from 'lucide-react';
import { useUser } from '@/contexts/UserProvider';

const renderOutput = (output) => {
  if (!output || output.length === 0) return 'No output';
  
  return output.map((item, index) => (
    <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
      {item.error ? (
        <p className="text-red-500">{item.error}</p>
      ) : (
        <>
          <p><strong>Test Case {index + 1}:</strong></p>
          <p>Input: {JSON.stringify(item.input)}</p>
          <p>Expected: {JSON.stringify(item.expected)}</p>
          <p>Output: {JSON.stringify(item.output)}</p>
          <p className={item.passed ? "text-green-500" : "text-red-500"}>
            {item.passed ? "Passed" : "Failed"}
          </p>
        </>
      )}
    </div>
  ));
};

const CodeEditor = ({ setCode, setOutput, output, code, id, answers, setAnswersFunc, handleTimeComplexity , handleAllPassed, setReview, problem}) => {
  const [editorMounted, setEditorMounted] = useState(false);

  const [wrongAnswers, setWrongAnswers] = useState(0)
  
  const handleEditorChange = (value) => {
    setCode(value);

    localStorage.setItem(`code-${id}`, value);

  };

  const {user} = useUser()
  console.log(user)

  const onClear = () => {
    setCode("");
    setOutput([]);
    localStorage.removeItem(`code-${id}`);

    
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${id}`);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [id, setCode]);

  const updateSolved = async () => {
    try{
      const response = await fetch("http://localhost:3003/internal/problems", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: user.id, problemId: id})
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }catch(error){
      console.error("Error while getting updating to solved:", error);

    }
  }


  const executeCode = async () => {
    try {
      const response = await fetch(`http://localhost:3003/submit/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setOutput(result);
      const failedTests = result.filter(test => !test.passed); 

      if (failedTests.length > 0) {
        setWrongAnswers(prevCount => prevCount + 1);
        if(wrongAnswers == 1 || wrongAnswers >= 3){
          await getLLMfeedback(code, failedTests);
          setWrongAnswers(0)
        }

      }

      if(failedTests.length == 0){
        handleAllPassed(true)
        await updateSolved()
        await TimeComplexityLLM(code)
        await fetchCodeReview(problem,  code)
      }
    } catch (error) {
      setOutput([{ error: 'Error executing code: ' + error.message }]);
    }
  };

  const helpLlm = async () => {
    const sessionId = 3;
    const question = `${code}\n\n

      the above code is the code that the user is writing and he is probably stuck.
      the user has asked for help. Remeber that you're an ai teacher and your purpose is help the student reach towards the solutions himself. 
      Don't provide explanations rather ask the user more questions so he can think himself and answer to you if possible. Don't provide any code no matter what, no code, you're an ai teacher remember. Don't give the entire solution but rather a small help towards the solutions.
      The repsonse output should be just breif and should be question that should be relevant to the question. Max number of lines should be just 3. The slight help should be direct, but rather let the user figure out the soliution towards the problem himself. 
    `;
    try {
      const response = await fetch("http://localhost:3003/llm/ask-llm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, question })
      });

      if (!response.ok) {
        throw new Error("LLM request failed");
      }
      const data = await response.json();
      setAnswersFunc(data.response);

      
    } catch (error) {
      console.error("Error while getting LLM help:", error);
    }
  };

  const getLLMfeedback = async (code, failedTests) => {
    const sessionId = 3;
    const question = `
      Here's my code:
      ${code}

      The following test cases failed:
      ${failedTests.map((test, index) => `
        Test Case ${index + 1}:
        Input: ${JSON.stringify(test.input)}
        Expected: ${JSON.stringify(test.expected)}
        Output: ${JSON.stringify(test.output)}
      `).join('\n')}

      Can you explain why the code is not correct and suggest how to fix it? Don't give the code or the solution if the test cases are failed,
      just point where the code is wrong, and give the direction on how to solve it. Be very breif. Also give the explanation on the correct approach you've provided. 
      Don't give the corrected code no matter what. Act like a teacher helping the student why the test cases passed and what the student should do next, ask the student more question if required to let him react the solution .
      As an example, if a test-case times out, the assistant shouldn’t just say: “It timed out because it was a large input size”. It should first pick the right question to ask the student e.g.
       “What can you say about the difference between this test-case and the other test-cases that passed?” Then depending on what answer the student gives, ask the next relevant question, 
       eventually making the student see that this test-case is quite large and some particular section of their code timed out processing that size.
    `;

    try{
      const response = await fetch("http://localhost:3003/llm/ask-llm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, question })
      })
      if (!response.ok) {
        throw new Error("LLM request failed");
      }
      const data = await response.json();
      setAnswersFunc(data.response);
    }catch(error){
      console.error("Error while getting LLM feedback:", error);
    }
  }


  const CorrectAnswerLLM = async (code) => {
    const sessionId = 3
    const question = `code +  
      ${code}
        the above code is the correct solution for problem. 
        Explain how the ways the user can improve the code. 
        Give me review of the Code too. How the code can be optimsied in terms of space and time complexity. 
        If everything is perfect, congratulate on solving the problem 
    `
    try{
      const response = await fetch("http://localhost:3003/llm/ask-llm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, question })
      })

      if(!response.ok){
        throw new Error("LLM request failed")
      }
      const data = await response.json()
      setAnswersFunc(data.response)
    }catch(error){
      console.error("Error while getting LLM feedback:", error);
    }
  }

  const GetLlmHint = async() => {
    const sessionId = 3
    const question = `code +  
    ${code}
      the above code is the code that the user is writing and he is probably stuck.
      the user has asked for hint, give it to him. Make it breif.
      Start you response by "Hint: your hint".  Hint should not give way the solution to the problem but rather should try to help the student understand the way towards the solution
    `
    try{
      const response = await fetch("http://localhost:3003/llm/ask-llm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, question })

      })
      if(!response.ok){
        throw new Error("LLM request failed")
      }
      const data = await response.json()
      setAnswersFunc(data.response)
      console.log("hint", data)
    }catch(error){
      console.error("Error while getting LLM feedback:", error);
    }
  }

  const TimeComplexityLLM = async(prompt) => {
    try{
      const response = await fetch("http://localhost:3003/llm/time-complexity", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt})
      })
      if(!response.ok){
        throw new Error("LLM request failed")
      }
      const data = await response.json()
      handleTimeComplexity(data.complexity)
      
    }catch(error){
      console.error("Error while getting LLM feedback:", error);

    }
  }



  const fetchCodeReview = async (problem, code) => {
    const question = problem + code;
    try {
      const response = await fetch("http://localhost:3003/llm/code-review", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({question})
      });
  
      if (!response.ok) {
        throw new Error("LLM request failed");
      }
      
      const data = await response.json();
      console.log("Raw response data:", data);
  
      const cleanJsonString = (str) => {
        return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
      };
  
      let reviewObject;
      try {
        reviewObject = JSON.parse(data.response);
      } catch (parseError) {
        console.warn("Failed to parse response directly, attempting to clean and parse:", parseError);
        
        const cleanedResponse = cleanJsonString(data.response);
        try {
          reviewObject = JSON.parse(cleanedResponse);
        } catch (secondParseError) {
          console.error("Failed to parse cleaned response:", secondParseError);
          throw new Error("Unable to parse the response from the server");
        }
      }
      console.log("Parsed review object:", reviewObject);
      if (reviewObject) {
        console.log("Time Complexity:", reviewObject.timeComplexity);
        console.log("Space Complexity:", reviewObject.spaceComplexity);
      }
      setReview(reviewObject)
    } catch(error) {
      console.error("Error while getting LLM help:", error)
      throw error;
    }
  }


  

  return (
    <div className="p-4 h-full bg-[#F5F7F8] border border-gray-900 rounded-md w-[600px]">
      <div className=' pr-2 flex justify-end items-end  '>
       
      </div>
      <div className="mb-4 mt-4 border border-gray-300 rounded-md overflow-hidden">
        <Editor
          height="450px"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          onMount={() => setEditorMounted(true)}
          options={{
            theme: 'vs-light',
            backgroundColor: '#9CFF83'
          }}
        />
      </div>
      <div className="flex flex-row justify-between space-x-2 mb-4">
        <div className="flex flex-row gap-4">
          <button
            onClick={onClear}
            className="px-8 py-1 bg-[#D2D2D2] text-black rounded-xl border border-gray-900 hover:bg-[#a1a1a1] transition-colors"
          >
            Clear
          </button>
          <button
            onClick={executeCode}
            className="px-8 py-1 bg-[#9CFF83] text-black rounded-xl border border-gray-900 hover:bg-[#71f550] transition-colors"
          >
            Run
          </button>
        </div>
        <div className='flex flex-row gap-3'>
            <button
              className="px-8 py-1 bg-[#D2D2D2] text-black rounded-xl border border-gray-900 hover:bg-[#a1a1a1] transition-colors flex flex-row gap-3"
              onClick={helpLlm}
            >
              <Lightbulb  color="black" fill='yellow'/>

              <p>Help</p>
            </button>

            
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Output:</h3>
        <div className="bg-[#EDFAE4] p-4 rounded-md border border-gray-300 min-h-[200px]">
          {renderOutput(output)}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;