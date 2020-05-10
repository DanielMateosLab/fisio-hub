import { ObjectId } from 'bson'

export interface Center {
  _id?: ObjectId
  name: string
}

export interface User {
  _id?: ObjectId
  email: string
  password: string
  roles: Array<{
    _id: ObjectId
    firstName: string
    lastName: string
    role: 'professional' | 'patient'
    centerName: string
  }>
}

export interface Professional {
  _id?: ObjectId
  center_id: ObjectId
  isAdmin: boolean
  firstName: string
  lastName: string
  email: string
}

export interface Patient {
  _id?: ObjectId
  center_id: ObjectId
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
  center_id: ObjectId
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