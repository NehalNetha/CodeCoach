import { Sidebar } from "lucide-react";
import {useState, useEffect} from "react"
import ProblemDescription from "./ProblemDescription";

const ProblemPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProblemId, setSelectedProblemId] = useState(null);
  
    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);
  
    const handleProblemSelect = (problemId) => {
      setSelectedProblemId(problemId);
      closeSidebar();
    };
  
    return (
      <div>
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
        <Sidebar 
          isOpen={isOpen} 
          close={closeSidebar} 
          onProblemSelect={handleProblemSelect} 
        />
        <ProblemDescription problemId={selectedProblemId} />
      </div>
    );
  };