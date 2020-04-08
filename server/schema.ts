import { gql } from 'apollo-server'

const typeDefs = gql`
  type Appointment {
    id: ID!
    date: String
    service: Service
    proffesional: Proffesional
    patient: Patient
    status: AppointmentStatus
    payment: Payment
  }

  type Event {
    id: ID!
    type: String
    date: String
    duration: Int
    proffesionals: [Proffesional]
  }

  type Service {
    id: ID!
    name: String
    duration: Int
    prize: Float
  }

  type Proffesional {
    id: ID!
    name: String
    appointments: [Appointment]
    events: [Event]
    weekSchedule: [Workday]
    timeScheduleSettings: TimeScheduleSettings
  }
  type TimeScheduleSettings {
    proffesionals: [Proffesional]
    timeFrame: TimeFrame
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

  type Workday {
    day: String
    fragments: [TimeFragment]
  }

  type TimeFragment {
    start: DayPoint
    end: DayPoint
  }

  type DayPoint {
    hour: Int
    minute: Int
  }

  enum AppointmentStatus {
    PENDING
    MISSED
    DONE
  }

  enum TimeFrame {
    DAY
    WEEK
    MONTH
  }

  type Query {
    fetchAppointments(id: ID!): [Appointment]
  }
`

export default typeDefs
