import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'




const ChatBox = ({ answers }) => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  const initiateLlm = async (question) => {
    const sessionId = 3;

    try {
      const res = await fetch("http://localhost:3003/llm/ask-llm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, question })
      });

      if (!res.ok) {
        throw new Error("Failed to initiate llm");
      }
      const data = await res.json();
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => msg.text !== '...'),
        { text: data.response, sender: 'LLM' }
      ]);
    } catch (error) {
      console.log("error happened while creating experience ", error);
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => msg.text !== '...'),
        { text: data.response, sender: 'LLM' }
      ]);
    }
  };

  const removeDuplicates = (array) => {
    const seen = new Set();
    return array.filter(msg => {
      const duplicate = seen.has(msg.text);
      seen.add(msg.text);
      return !duplicate;
    });
  };
  
  

  useEffect(() => {
    if (Array.isArray(answers) && answers.length > 0) {
      setMessages(prevMessages => {
        const newMessages = [
          ...prevMessages,
          ...answers.map(answer => ({ text: answer, sender: 'LLM' }))
        ];
        return removeDuplicates(newMessages);
      });
    } else if (typeof answers === 'string' && answers.trim() !== '') {
      setMessages(prevMessages => {
        const newMessages = [
          ...prevMessages,
          { text: answers, sender: 'LLM' }
        ];
        return removeDuplicates(newMessages);
      });
    }
  }, [answers]);
  

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages(prevMessages => [
      ...prevMessages,
      { text: input, sender: 'user' },
      { text: '...', sender: 'LLM' }
    ]);
    initiateLlm(input + "no matter what do not send the solution for the problem as your response. you're a socratic ai teacher, your response should only contain the way towards the solution of the problem and not the complete solution. Don't give any hint, just act like a teacher as i said above.");
    setInput('');
  };


  return (
    <div className=" w-full ">
      <div className="bg-[#EDFAE4] p-4 rounded-lg  border border-gray-500   h-[34rem] overflow-y-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.sender === 'user' ? 'bg-[#F0A8D0] text-black' : 'bg-[#e4dcf7] text-black'
              }`}
            >
              <ReactMarkdown>
               {msg.text}
               </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2 border border-gray-800 rounded-l-xl focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-[#B9A0FF] text-white px-4 py-2  border border-gray-800  rounded-r-xl hover:bg-[#8c64f9] focus:outline-none "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;