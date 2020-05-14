import { Center, Professional, Role } from '../storage/types'
import { ObjectId } from 'bson'

export const mockCenter: Center = {
  _id: new ObjectId(),
  name: 'mockCenter'
}

export const mockProfessional: Professional = {
  center_id: mockCenter._id!,
  isAdmin: true,
  email: 'a@a.com',
  firstName: 'aaaa',
  lastName: 'bbbb cccc'
}

export const mockRole: Role = {
  role: 'professional',
  role_id: new ObjectId(),
  center_id: mockCenter._id!
}
