import { ObjectId } from 'bson'

export interface Center {
  _id?: string
  name: string
}

export interface Role {
  role: 'professional' | 'patient'
  role_id: ObjectId // This is important for patients identification, as email is not unique
  center_id: string // It will be the shard key (hashed) for the main collections
}

export interface User {
  _id?: ObjectId
  email: string
  password?: string
  roles?: Role[]
}

export interface Professional {
  _id?: ObjectId
  center_id: string
  isAdmin: boolean
  firstName: string
  lastName: string
  email: string
}

export interface Patient {
  _id?: ObjectId
  center_id: string
  firstName: string
  lastName: string
  email: string
  mainProfessional: {
    firstName: string
    lastName: string
  }
}

export interface Service {
  _id?: ObjectId
  name: string
  duration: number
  price: number
}

export interface Appointment {
  _id?: ObjectId
  center_id: string
  date: Date
  professional: {
    _id: ObjectId
    firstName: string
    lastName: string
  }
  patient: {
    _id: ObjectId
    firstName: string
    lastName: string
  }
  service: Omit<Service, '_id'>
  notes: string
  payment?: {
    method: 'card' | 'cash'
    value: number
  }
}