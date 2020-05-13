require('dotenv').config()
import { unlink } from 'fs'
import { MongoClient } from 'mongodb'

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

interface BSONSchema {
  validator: {
    $jsonSchema: {
      bsonType: 'object'
      additionalProperties: false
      properties: {
        [key: string]: Properties
      }
      required: string[]
    }
  }
}

const _id: Properties = {
  bsonType: 'objectId',
  description: '"_id" must be a valid objectId reference',
}
const center_id: Properties = {
  bsonType: 'objectId',
  description: '"center_id" must be a valid objectId reference',
}
const name: Properties = {
  bsonType: 'string',
  description: '"name" must be a valid string',
}
const firstName: Properties = {
  bsonType: 'string',
    description: '"firstName" must be a valid string',
}
const lastName: Properties = {
  bsonType: 'string',
    description: '"lastName" must be a valid string',
}
const email: Properties = {
  bsonType: 'string',
    description: '"email" must be a valid string',
}

const centerSchema: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {
        _id: {},
        name,
      },
      required: ['name']
    }
  }
}

const userSchema: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {
        _id: {},
        email: {
          bsonType: 'string',
          description: '"email" is required and must be a valid string',
        },
        password: {
          bsonType: 'string',
          description: '"password" is required and must be a valid string',
        },
        roles: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['_id', 'centerName', 'role'],
            additionalProperties: false,
            description: 'role in "roles" must contain the stated properties',
            properties: {
              _id,
              firstName,
              lastName,
              centerName: {
                bsonType: 'string',
                description: '"centerName" is required and must be a valid string',
              },
              role: {
                enum: ['professional', 'patient'],
                description: '"role" is required and must be one of the listed options. '
              }
            }
          }
        }
      },
      required: ['email', 'password']
    }
  }
}

const professionalSchema: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {
        _id: {},
        center_id,
        isAdmin: {
          bsonType: 'bool',
          description: '"isAdmin" is required and of type bool'
        },
        firstName,
        lastName,
        email,
      },
      required: ['center_id', 'firstName', 'lastName', 'email']
    }
  }
}

const patientSchema: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {
        _id: {},
        center_id,
        firstName,
        lastName,
        email,
        mainProfessional: {
          bsonType: 'object',
          additionalProperties: false,
          description: '"mainProfessional" is required and of type object',
          properties: {
            firstName,
            lastName
          },
          required: ['firstName', 'lastName']
        }
      },
      required: ['center_id', 'firstName', 'lastName', 'email', 'mainProfessional']
    }
  }
}

const serviceSchema: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {
        _id: {},
        name,
        duration: {
          bsonType: 'int',
          description: '"duration" is required and is of int type'
        },
        price: {
          bsonType: 'decimal',
          description: '"price" is required and is of decimal type'
        }
      },
      required: ['name', 'duration', 'price']
    }
  }
}

const service = serviceSchema.validator.$jsonSchema
delete service.properties._id

const appointmentSchema: BSONSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      additionalProperties: false,
      properties: {
        _id: {},
        date: {
          bsonType: 'date',
          description: '"date" is required and must be of type date'
        },
        center_id,
        professional: {
          bsonType: 'object',
          required: ['_id', 'firstName', 'lastName'],
          additionalProperties: false,
          description: '"professional" must contain the stated fields.',
          properties: {
            _id,
            firstName,
            lastName
          }
        },
        patient: {
          bsonType: 'object',
          required: ['_id', 'firstName', 'lastName'],
          additionalProperties: false,
          description: '"patient" must contain the stated fields.',
          properties: {
            _id,
            firstName,
            lastName
          }
        },
        service: {
          ...service,
          description: '"service" is required and must contain the stated fields.',
        },
        notes: {
          bsonType: 'string',
          description: '"notes" must be a valid string',
        },
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
      },
      required: ['date', 'center_id', 'professional', 'patient', 'service', 'notes']
    }
  }
}

const collectionsMap = {
  centers: centerSchema,
  users: userSchema,
  professionals: professionalSchema,
  patients: patientSchema,
  services: serviceSchema,
  appointments: appointmentSchema
}

;(async () => {
  let completed = false
  const uri = process.env.DB_URI_ADMIN
  const dbName = process.env.DB_NAME
  if (!uri || !dbName) {
    throw new Error('Missing DB uri or name')
  }

  const client = new MongoClient(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  try {
    await client.connect()
    const db = client.db(dbName)

    for (const collection in collectionsMap) {
      console.log(`Adding validator to "${collection}" collection...`)
      // @ts-ignore
      const validator = collectionsMap[collection].validator
      await db.command({
        collMod: collection,
        validator,
        validationLevel: 'moderate' // Avoid problems when applying document versioning pattern
      }).catch(e => {
        if (e.code === 26) {
          return db.createCollection(collection, { validator, validationLevel: 'moderate' })
        }
        throw e
      })
      console.log(` ✔ ️Validator added to "${collection}"`)
    }
    console.log('\x1b[32m%s\x1b[0m','Successfully added/updated all the validators')
    completed = true
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
    if (completed) {
      console.log(`Removing ${__filename}...`)
      unlink(__filename, err => {
        if (!err) {
          console.log('Done!')
        } else {
          console.error('Could not remove schemas.js, do it manually if you wish')
        }
      })
    }
  }
})()
