import React from 'react'

const InfoBox = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="m-3">
      <h3 className="font-bold">{title}</h3>
      <p className="text-slate-600">{text}</p>
    </div>
  )
}

export default InfoBox
