import React from 'react'

const StudentRecord = ( { pdfSrc } :  {pdfSrc : string}) => {
  return (
    <div className='max-w-[90vw] w-full px-10 py-5 justify-center flex flex-col'>
        <div className='flex flex-row justify-between my-5'>
					<h2 className='text-2xl font-bold'>Histórico do Aluno</h2>  
        </div>
        <iframe className='w-full h-screen' src={ pdfSrc }/>
    </div>
  )
}

export default StudentRecord
