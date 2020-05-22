import { Center, Professional, Role, User } from '../common/entityTypes'
import { ObjectId } from 'bson'

export const mockCenter: Center = {
  _id: 'mockCenter0',
  name: 'mockCenter'
}

export const mockProfessional: Professional = {
  center_id: mockCenter._id!,
  isAdmin: true,
  email: 'a@a.com',
  firstName: 'aaaa',
  lastName: 'bbbb cccc'
}

export const mockUser: User = {
  email: 'a@a.com',
  password: 'mockPassword'
}

export const mockRole: Role = {
  role: 'professional',
  role_id: new ObjectId(),
  center_id: mockCenter._id!
}
