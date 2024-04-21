import SignUp from '@/components/auth/signup'
import { DotBackground } from '@/components/background'

const SignUpPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <DotBackground />
      <SignUp id={params.id} />
    </div>
  )
}

export default SignUpPage
