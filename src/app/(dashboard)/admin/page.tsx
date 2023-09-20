import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const adminPage = async () => {
  const session = await getServerSession(authOptions)
  if(session?.user){
    return (
      <div className='text-2xl'>Admin page - Welcome back {session?.user.username}</div>
    )    
  }
  return(
    <div className='text-2xl'>Please Login to see this page</div>
  )

}

export default adminPage