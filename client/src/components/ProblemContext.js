import React, { createContext, useState, useContext, useEffect } from 'react';
import { X } from 'lucide-react';


const ProblemContext = createContext();

const ProblemProvider = ({ children }) => {
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:3003/problems');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);


  const handleProblemSelect = (problemId) => {
    setSelectedProblemId(problemId);
  };

  return (
    <ProblemContext.Provider value={{
      selectedProblemId,
      handleProblemSelect,
      problems
    }}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemProvider

export { ProblemContext}