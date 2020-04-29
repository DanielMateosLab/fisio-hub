import useSWR from 'swr'
import { Professional } from '../storage/professionalsDAO'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher, {
    shouldRetryOnError: false
  })
  const user: Professional = data && data.professional
  return { user, mutate }
}