import { Appointment, Center, Professional, Role, User, WithoutId } from '../common/entityTypes'
import { ObjectID } from 'bson'

export const mockCenter: Center = {
  _id: 'mockCenter0',
  name: 'mockCenter'
}

export const mockProfessional: WithoutId<Professional> = {
  center_id: mockCenter._id!,
  isAdmin: true,
  email: 'a@a.com',
  firstName: 'aaaa',
  lastName: 'bbbb cccc'
}

export const mockUser: WithoutId<User> = {
  email: 'a@a.com',
  password: 'mockPassword',
  roles: []
}

export const mockRole: Role = {
  role: 'professional',
  role_id: new ObjectID(),
  center_id: mockCenter._id!,
  lastName: 'Last',
  firstName: 'First',
  centerName: 'mockCenterName'
}

export const mockAppointment: Appointment = {
  professional: {
    _id: new ObjectID(),
    firstName: mockProfessional.firstName,
    lastName: mockProfessional.lastName
  },
  service: {
    duration: 60,
    name: 'physiotherapy',
    price: 30.50
  },
  payment: {
    method: 'card',
    value: 30.50
  },
  patient: {
    _id: new ObjectID(),
    firstName: 'María Dolores',
    lastName: 'Del Pazo Butragueño',
  },
  date: new Date(),
  _id: new ObjectID(),
  center_id: 'lol0',
  notes: 'Mama mía'
}