import React, { useEffect, useState } from 'react'
import { MarkdownRenderer } from './ProblemDescription'

function CodeReview({review}) {

  // console.log("review", review)

 
 

  return (
    <div className='bg-[#EDFAE4] w-full border border-gray-950 rounded-md p-3'>
        <h1 className='pb-3 font-semibold'>
            Code Review: 
           
        </h1>
        {review == null ?  "loading":
        <div className='flex flex-col gap-5'>
            <p> <span className='font-semibold'>Time Complexity: </span> {review.timeComplexity} </p>
            <p> <span className='font-semibold'>Space Complexity: </span>{review.spaceComplexity} </p>
            <p> <span className='font-semibold'>Code Review: </span>{review.codeReview} </p>
            <p> <span className='font-semibold'>Alnerative Solutions: </span>{review.differentMethods} </p>
            <p> <span className='font-semibold'>Topics: </span>{review.topics} </p>
            
        </div>
        }
    </div>
  )
}

export default CodeReview