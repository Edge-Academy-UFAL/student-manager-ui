import React from 'react'

const StudentRecordFallback = ({
  isAuthorizedUpdateRecord,
}: {
  isAuthorizedUpdateRecord: boolean
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center">
      <p>Histórico não encontrado.</p>
      {isAuthorizedUpdateRecord && (
        <p>Que tal adicionar seu histórico mais atualizado?</p>
      )}
    </div>
  )
}

export default StudentRecordFallback
