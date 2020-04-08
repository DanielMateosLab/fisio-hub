import { gql } from 'apollo-server'

const typeDefs = gql`
  type Appointment {
    id: ID!
    date: Int
    proffesional: Proffesional
    patient: Patient
    status: AppointmentStatus
    payment: Payment
  }
  type Service {
    id: ID!
    name: String
    "Expressed in minutes"
    duration: Int
    prize: Float
  }
  type Proffesional {
    id: ID!
    name: String
    appointments: [Appointment]
  }
  type Patient {
    id: ID!
    name: String
    appointments: [Appointment]
  }
  type Payment {
    id: ID!
    cash: Int
    card: Int
    appointment: Appointment
  }

  enum AppointmentStatus {
    PENDING
    MISSED
    DONE
  }

  type Query {
    "Fetch appointments by id"
    fetchAppointments(id: ID!): [Appointment]
  }
  type Mutation {
    createAppointment(): [Appointment]
    updateAppointment(): [Appointment]
    deleteAppointment(): [Appointment]
  }
`

export default typeDefs