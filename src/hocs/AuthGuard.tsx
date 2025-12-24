// Third-party Imports
import { getServerSession } from 'next-auth'

// Type Imports
import type { ChildrenType } from '@core/types'

export default async function AuthGuard({ children }: ChildrenType) {
  const session = await getServerSession()

  // return <>{session ? children : <AuthRedirect lang={locale} />}</>
  return <>{session ? children : children }</>

}
