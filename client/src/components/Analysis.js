import React from 'react'
import TimeComplexityChart from './TimeComplexity'
import CodeReview from './CodeReview'

function Analysis({timeComplexityCheck, review}) {
  return (
    <div className='flex flex-col w-[44.5rem] gap-3'>
        <TimeComplexityChart complexity={timeComplexityCheck} />
        <CodeReview review={review}/>
    </div>
  )
}

export default Analysis