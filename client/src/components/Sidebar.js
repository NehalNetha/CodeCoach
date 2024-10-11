"use client"
import { X } from "lucide-react"
import { ProblemContext } from "./ProblemContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";






const Sidebar = ({ isOpen, close }) => {
  const pathname = usePathname()
  const [problems, setProblems] = useState([]);
  const [currentProblemId, setCurrentProblemId] = useState("")

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:3003/internal/problems');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

 
  useEffect(() => {
    console.log("pathname", pathname)
  }, []);

    return (
      <div className={`fixed top-0 left-0 h-full w-64 z-50 bg-white text-black border border-gray-800  transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
  
        <div className="flex flex-row justify-between p-3">
            <h2 className="text-xl font-bold p-3">Problems</h2>
            <button onClick={close}>
              <X />
            </button>
        </div>

        <hr></hr>
        
  
        <ul className="p-2 pt-[3rem] flex flex-col gap-7">
          {problems.map((problem, index) => (
            <Link href={`http://localhost:3000/problems/${problem.id}`}  onClick={close} key={index}>
                 <li 
              className={`py-2 px-4 hover:bg-purple-500 hover:rounded-lg hover:text-white cursor-pointer
                ${pathname === `/problems/${problem.id}` ? 'bg-purple-500 text-white rounded-lg' : ''}`}
              >{problem.title}</li>
            </Link>

          ))}
        </ul>
      </div>
    )

}

export default Sidebar