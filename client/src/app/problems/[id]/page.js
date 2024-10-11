"use client"
import React, { useState , useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import ProblemDescription from '@/components/ProblemDescription';
import ChatBox from '@/components/ChatBox';
import CodeEditor from '@/components/CodeEditor';
import { Router, useParams, useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import Analysis from '@/components/Analysis';
import UserProvider from '@/contexts/UserProvider';

const page = () => {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState([])
  const [topBarSelected, setTopBarSelected] = useState('Problem')
  const [timeComplexityCheck, setTimeComplexityCheck] = useState("asas")
  const [allPassed, setAllPassed] = useState(false)
  const [review, setReview] = useState(null)

  useEffect(() => {
    console.log("review", review)
  }, [review])



  const handleAllPassed = () => {
    setAllPassed(true)
  }

  const handleTimeComplexity = (complexity) => {
    setTimeComplexityCheck(complexity)
  }
 
  const handleSectionSelect = (section) => {
    setTopBarSelected(section);
  };

  const setAnswersFunc = (data) => {
    setAnswers(prev => [...prev, data]);
  }

 
  const params =  useParams()
  const id = params.id;

  const initiateLlm = async (problemData) => {
    const sessionId = 3
    const question = `question:${problemData.description}${problemData.examples}${problemData.starterCode.javascript}this is the problem i am going to solve`;

    try {
      const res = await fetch("http://localhost:3003/llm/ask-llm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, question })
      })

      if (!res.ok) {
        throw new Error("Failed to initiate llm")
      }
      const data = await res.json()
      setAnswersFunc(data.response)
    } catch (error) {
      console.log("error happened while creating experience ", error)
    }
  }


  useEffect(() => {
    const fetchingProblem = async () => {
        try{
        const response = await fetch(`http://localhost:3003/internal/problems/${id}`, {
            method: "GET"
        })
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const res = await response.json()
        setProblem(res)
        setCode(res.starterCode.javascript);
        await initiateLlm(res)
        console.log("problem is :", problem)

     }catch(error){
        console.error("Error fetching problem:", error);
     }finally{
        setLoading(false)
     }
    }

  
    fetchingProblem()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } 

  return (
    <UserProvider>
    <div className="flex flex-row gap-6 mx-8 mb-5">

          <div className="flex flex-col gap-3 ">
            <TopBar handleSectionSelect={handleSectionSelect} topBarSelected={topBarSelected} allPassed={allPassed} />
            {topBarSelected == "Problem" &&
              <ProblemDescription 
                title={problem.title}
                description={problem.description}
                constraints={problem.constraints}
                examples={problem.examples}
                topic={problem.topic}
              />

            }
            
            {topBarSelected == "Teacher" &&  <ChatBox answers={answers}  />}
            {topBarSelected == "Analysis" &&
               <Analysis 
                  timeComplexityCheck={timeComplexityCheck} 
                  review={review}
               />}

          </div>


      <div >
           <CodeEditor 
           setCode={setCode} 
           setOutput={setOutput} 
           output={output} 
           code={code} 
           id={id}
           answers={answers}
           setAnswersFunc={setAnswersFunc}
           handleTimeComplexity={handleTimeComplexity}
           timeComplexityCheck={timeComplexityCheck}
           handleAllPassed={handleAllPassed}
           setReview={setReview}
           problem = {problem}
          />

      </div>

    </div>
    </UserProvider>


  
  );
};

export default page;
