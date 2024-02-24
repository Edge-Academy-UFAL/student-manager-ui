interface StudentProfilePageProps {
  params: { id: string }
}

// const getData = async (id: string) => {
//   const res = await fetch(`http://localhost:3000/api/students/${id}`, {
//     cache: 'no-store',
//   })

//   if (!res.ok) {
//     return null
//   }

//   return res.json()
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StudentProfile = ({ params }: StudentProfilePageProps) => {
  // const data = getData(params.id)

  // if (!data) {
  //   return notFound();
  // }

  return <></>
}

export default StudentProfile
