"use client"
import React, { useState , useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import ProblemDescription from '@/components/ProblemDescription';
import ChatBox from '@/components/ChatBox';
import CodeEditor from '@/components/CodeEditor';

const page = () => {
  const [code, setCode] = useState('// Write your javascript code here\nconsole.log("Hello, World!")');
  const [output, setOutput] = useState('');


  return (
    <div className="flex flex-row items-start gap-5 justify-start  ">
        <div className="flex flex-col">
            <ProblemDescription />
            <ChatBox />
        </div>
        <CodeEditor setCode={setCode} setOutput={setOutput}  output={output} code={code}/>

    </div>
   
  );
};

export default page;
