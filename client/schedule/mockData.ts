import { Appointment, Professional } from '../../common/entityTypes'
import { ObjectID } from 'bson'
import moment from 'moment'

export const professionals: Professional[] = [
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Daniel',
    lastName: 'Mateos Labrador'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Jorge',
    lastName: 'Lopez Santos'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Carmen',
    lastName: 'Miguel Sánchez'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Andrés',
    lastName: 'Ballesteros Muñoz'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Alvaro',
    lastName: 'Gonzalez Zape'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Alejandro',
    lastName: 'Miguel Sánchez'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Julia',
    lastName: 'Pérez Andrade'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Cameron',
    lastName: 'Smith Oregon'
  },
  {
    _id: new ObjectID(),
    center_id: 'mock0',
    isAdmin: true,
    email: 'a@a.com',
    firstName: 'Paula',
    lastName: 'Téllez Blanco'
  }
]

export const appointments: Appointment[] = [
  {
    professional: {
      _id: professionals[0]._id,
      firstName: professionals[0].firstName,
      lastName: professionals[0].lastName
    },
    service: {
      duration: 60,
      name: 'Fisioterapia',
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
    date: moment().hour(14).toDate(),
    _id: new ObjectID(),
    center_id: 'mock0',
    notes: 'Mama mía'
  }
]