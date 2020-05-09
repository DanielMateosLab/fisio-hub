import _ from 'lodash'

type BSONType =
  | 'number'
  | 'double' | 'string' | 'object' | 'array'
  | 'binData' | 'undefined' | 'objectId' | 'bool'
  | 'date' | 'null' | 'regex' | 'dbPointer' | 'javascript'
  | 'symbol' | 'javascriptWithScope' | 'int' | 'timestamp'
  | 'long' | 'decimal' | 'minKey' | 'maxKey';

interface Properties {
  bsonType?: BSONType | BSONType[]
  description?: string
  additionalProperties?: boolean
  properties?: {
    [key: string]: Properties
  }

  enum?: string[]

  minLength?: number
  maxLength?: number

  items?: Properties | Array<Properties>
  minItems?: number
  maxItems?: number
  required?: Array<string>
}

interface BSONSchema<T = { [key: string]: Properties }> {
  validator: {
    $jsonSchema: {
      bsonType: 'object'
      additionalProperties: false
      properties: T
      required: Array<keyof T>
    }
  }
}

// TODO: delete MongoSchema class and just type the schemas
class MongoSchema<T extends { [key: string]: Properties }> {
  validator: any = {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false
    }
  }

  constructor(properties: T, optional: Array<keyof T> = []) {
    this.validator.$jsonSchema.required = _.pull(Object.keys(properties), optional as any)
    this.validator.$jsonSchema.properties = { _id: {}, ...properties }
  }
}

const centerBSON: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {

      }
    }
  }
}


const requiredString = (key: string): Properties => ({
  bsonType: 'string',
  description: `"${key}" is required and must be a string`
})

const reference = (key: string): Properties => ({
  bsonType: 'objectId',
  description: `"${key}" must be a valid objectId reference`
})

export const centerSchema = new MongoSchema({
  name: requiredString('name')
})

export const userSchema = new MongoSchema(({
  email: requiredString('email'),
  password: requiredString('password'),
  roles: {
    bsonType: 'array',
    items: {
      bsonType: 'object' as any,
      required: ['_id', 'centerName', 'role'],
      additionalProperties: false,
      description: '"role" must contain the stated properties',
      properties: {
        _id: reference('_id'),
        centerName: requiredString('centerName'),
        role: {
          enum: ['professional', 'patient'],
          description: '"role" is required and must be one of the listed options. '
        }
      }
    },
    description: 'At least one role is required'
  }
}))

export const professionalSchema = new MongoSchema(
{
  center: reference('center'),
  firstName: requiredString('firstName'),
  lastName: requiredString('lastName'),
  email: requiredString('email'),
})

export const patientSchema = new MongoSchema({
  center: reference('center'),
  firstName: requiredString('firstName'),
  lastName: requiredString('lastName'),
  email: requiredString('email'),
  mainProfessional: reference('mainProfessional')
})

export const appointmentSchema = new MongoSchema({
  date: {
    bsonType: 'date',
    description: '"date" is required'
  },
  center: reference('center'),
  professional: {
    bsonType: 'object',
    required: ['_id', 'firstName', 'lastName'],
    additionalProperties: false,
    description: '"professional" must contain the stated fields.',
    properties: {
      _id: reference('_id'),
      firstName: requiredString('firstName'),
      lastName: requiredString('lastName')
    }
  },
  patient: {
    bsonType: 'object',
    required: ['_id', 'firstName', 'lastName'],
    additionalProperties: false,
    description: '"patient" must contain the stated fields.',
    properties: {
      _id: reference('_id'),
      firstName: requiredString('firstName'),
      lastName: requiredString('lastName')
    }
  },
  service: {
    bsonType: 'object',
    additionalProperties: false,
    required: ['name', 'duration', 'price'],
    description: '"service" is required and must contain the stated fields.',
    properties: {
      name: requiredString('name'),
      duration: {
        bsonType: 'int',
        description: '"duration" is required and is of int type'
      },
      price: {
        bsonType: 'decimal',
        description: '"price" is required and is of decimal type'
      }
    }
  },
  notes: requiredString('service'),
  payment: {
    bsonType: 'object',
    required: ['method', 'value'],
    additionalProperties: false,
    description: '"payment" must contain the stated fields.',
    properties: {
      method: {
        enum: ['cash', 'card'],
        description: '"method" is required and can only be one of the given enum values'
      },
      value: {
        bsonType: ['decimal'],
        description: '"value" is required and is of decimal type'
      }
    }
  }
}, ['payment'])

export const serviceSchema = new MongoSchema(
  {
    name: requiredString('name'),
    duration: {
      bsonType: 'number',
      description: '"duration" is required and is of number type'
    },
    price: {
      bsonType: 'decimal',
      description: '"price" is required and is of decimal type'
    }
  }
)