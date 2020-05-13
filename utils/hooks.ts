import useSWR from 'swr'
import { Professional } from '../storage/professionalsDAO'
import Router from 'next/router'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher, {
    shouldRetryOnError: false
  })
  // TODO: the user is not re-sent whenever it changes
  const user: Professional = data && data.professional
  return { user, mutate }
}

export function useGuestOnly() {
  const { user } = useUser()
  // Changes in user do not trigger a Router.back()

  if (user) {
    Router.back()
  }
}