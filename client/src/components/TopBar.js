import React from 'react';

function TopBar({  handleSectionSelect, topBarSelected, allPassed}) {
  console.log("disable:" , allPassed)
  return (
    <div className='flex flex-row bg-[#F5F7F8] p-3 rounded-md justify-around gap-2'>
      <button
        className={`w-[50%] rounded-md p-[5px] transition-all duration-300 ease-in-out ${
          topBarSelected == "Problem" ? 'bg-purple-500 text-white' : 'bg-white text-black'
        }`}
        onClick={() => handleSectionSelect('Problem')}
      >
        Problem
      </button>
      <button
        className={`w-[50%] rounded-md p-[5px] transition-all duration-300 ease-in-out ${
          topBarSelected == "Teacher" ? 'bg-purple-500 text-white' : 'bg-white text-black' 
        }`}
        onClick={() => handleSectionSelect('Teacher')}
      >
        Teacher
      </button>
      <button
        className={`w-[50%] rounded-md p-[5px] transition-all duration-300 ease-in-out ${allPassed ? "": "cursor-not-allowed " } ${
          topBarSelected == "Analysis" ? 'bg-purple-500 text-white' :'bg-white text-blac'}}`}
        // onClick={allPassed ? () =>  handleSectionSelect('Analysis') : () => {}}
          onClick={() => handleSectionSelect("Analysis")}
      >
        Analysis
      </button>
    </div>
  );
}

export default TopBar;
