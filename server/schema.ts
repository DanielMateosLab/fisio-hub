import { gql } from 'apollo-server'

const typeDefs = gql`
  type Appointment {
    id: ID
  }
  type Service {
    id: ID!
    name: String
    prize: Float
  }
`

export default typeDefs