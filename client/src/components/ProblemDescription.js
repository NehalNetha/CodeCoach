import React from 'react';
import ReactMarkdown from 'react-markdown';




const Example = ({examples}) => {
  return (
    <div>

      {examples.map((example, index) => (
        <div className="bg-gray-100 p-4 rounded mt-2" key={index}>
           <div><strong>Input:</strong> {example.input}</div>
           <div><strong>Output:</strong> {example.output}</div>
           {examples.explanation && (
             <div className="mt-2">
               <strong>Explanation:</strong> {example.explanation}
             </div>
           )}
         </div>
      ))}

    </div>
  )
}


function MarkdownRenderer({ content }) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

const ProblemDescription = ({ title, description, constraints, examples, topic }) => {
  return (
    <div className=" bg-[#EDFAE4] border border-gray-500 rounded-lg overflow-hidden">
      <div className="px-6 py-4 h-full overflow-y-auto">
        <div className="font-bold text-xl mb-2">{title}</div>

          {topic == "hashtable" ?         <p className="text-gray-700 text-base">{description} </p>:
             <MarkdownRenderer content={description}/>
        }


        {constraints && (
          <p className="text-gray-700 text-base mt-2">
            {constraints}
          </p>
        )}
        {examples && (
         
          <div className="mt-4">
            <span className="block font-bold">Example:</span>

            <Example examples={examples}/>
           
          </div>
        )}

        
      </div>
    </div>
  );
};

export default ProblemDescription;
export {MarkdownRenderer}

