"use client"
import EnhancedAIAnimation from "@/components/MainPageAnimation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



function RenderProblem({title, difficulty, id, finished}){
  return (
    <Link className="px-5 py-7 w-[75%] flex flex-row justify-between border border-gray-200 mb-4 mt-5 rounded-md hover:bg-gray-100 cursor-pointer"
      href={`problems/${id}`}
    >
      <div className="flex flex-col">
          <p className="text-xl ">{title}</p>
          <p className="text-sm text-green-600">{difficulty}</p>
      </div>

      <div>
        <button className={`w-[9rem] h-[2.6rem] border border-gray-400 ${finished ? "text-green-600" : "text-gray-400"} rounded-md hover:bg-white hover:text-black transition duration-300 ease-out`}>
          {
            finished ? "Solved" : "Solve Challange"
          }
        </button>
      </div>
    </Link>
  )
}

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);

  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:3003/internal/problems');
        const data = await response.json();
        setProblems(data);
        setFilteredProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    fetchProblems();
  }, []);

  const filterProblems = (type) => {
    setActiveFilter(type);
    if (type === 'all') {
      setFilteredProblems(problems);
    } else {
      const filtered = problems.filter(problem => problem.topic === type);
      setFilteredProblems(filtered);
    }
  };

  const solvedProblems =  (type) => {
    setActiveFilter(type);
    const filtered = problems.filter(problem => problem.finished === true);
    setFilteredProblems(filtered);

  }

  

  

  return (
    <main className="relative mx-8 mb-11">
      <div className="bg-[#EDFAE4] w-full h-[30rem] border border-gray-800 rounded-md  ">

         <div className=" pt-[5rem] p-11 flex flex-col gap-[5rem] ">
            <div>
                <p className="text-[#16423C] text-[2.7rem] font-bold w-[50%]">
                  Learn DSA but better, 
                </p>
                <p className="text-[#16423C] text-[2.7rem] font-bold w-[50%]">
                  don't let the AI learn for you.
                </p>
            </div>

            <div >
                <p className="text-[#16423C] text-lg font-bold w-[50%]">
                  Take help from AI, but not too much, we can help you to learn DSA.
                </p>
                <p className="text-[#16423C] text-lg font-bold w-[50%]">
                  By giving you AI assistence, but most importantly we push you

                </p>
            </div>

          </div> 
          <div className="absolute top-[2.6rem] right-40" >
             <EnhancedAIAnimation />
          </div>

      </div>

      <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-4 mb-4">
            <button
              className={`px-3 py-[4px] text-[14px] rounded-3xl ${activeFilter === 'all' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
              onClick={() => filterProblems('all')}
            >
              All Problems
            </button>
            <button
              className={`px-3 py-[4px] text-[14px] rounded-3xl ${activeFilter === 'hashtable' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
              onClick={() => filterProblems('hashtable')}
            >
              hashtable
            </button>
            <button
              className={`px-3 py-[4px] text-[14px] rounded-3xl ${activeFilter === 'two-pointers' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
              onClick={() => filterProblems('two-pointers')}
            >
              Two-pointers
            </button>
            <button
              className={`px-3 py-[4px] text-[14px] rounded-3xl ${activeFilter === 'finished' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
              onClick={() => solvedProblems('finished')}
            >
              Solved
            </button>
          </div>
            {filteredProblems.map((problem) => (
                  <RenderProblem title={problem.title} difficulty={problem.difficulty} id={problem.id} finished={problem.finished}  />
            ))}
        </div>
    </main>
  );
}
