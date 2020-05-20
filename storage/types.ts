import { ObjectId } from 'bson'


export interface Center {
  /** The center_id is a custom-generated id suitable to be a shard key */
  _id?: string
  name: string
}

export interface Role {
  role: 'professional' | 'patient'
  // This is important for patients identification, as email is not unique
  role_id: ObjectId,
  firstName: string,
  lastName: string,
  /** The center_id is a custom-generated id suitable to be a shard key */
  center_id: string,
  centerName: string
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