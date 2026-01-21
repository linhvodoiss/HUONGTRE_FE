
import { cookies } from 'next/headers'
import { AUTH } from '~/constants'

import Link from 'next/link'

export default async function Home() {
  const cookieStore = await cookies()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = cookieStore.get(AUTH.token)?.value
  return (
    <div className='min-h-screen'>
      <h1 className='text-black font-bold text-2xl'>Xin chào tất cả các bạn, mình tên là Quang</h1>
      <Link href='/menu' className='px-4 py-2 font-semibold text-base text-black bg-gray-200 rounded-md mt-4 inline-block'>menu</Link>
    </div>
  )
}
