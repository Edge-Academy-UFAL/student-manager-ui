const StudentRecord = ({ pdfSrc }: { pdfSrc: string }) => {
  return (
    <div className="w-full justify-center flex flex-col">
      <iframe className="w-full h-screen" src={pdfSrc} />
    </div>
  )
}

export default StudentRecord
