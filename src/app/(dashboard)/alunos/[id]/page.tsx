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
const StudentProfilePage = ({ params }: StudentProfilePageProps) => {
  // const data = getData(params.id)

  // if (!data) {
  //   return notFound();
  // }

  return <div></div>
}

export default StudentProfilePage
