import database from "../../storage/database"
import { CustomApiHandler } from "../../utils/types"
import ProffesionalsDAO from "../../storage/professionalsDAO"
import { FieldValidationError, loginValidationSchema } from '../../utils/validation'

const handler: CustomApiHandler = async (req, res) => {
  const { method } = req

  if (method == 'POST') {
    await postHandler(req, res)
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).json({ message: 'Method not allowed' })
}

const postHandler: CustomApiHandler = async (req, res) => {
  try {
    let formValues = req.body
    await loginValidationSchema.validate(formValues, {abortEarly: false})

    ProffesionalsDAO.injectDB(req.db)
    const _id = await ProffesionalsDAO.loginProfessional(formValues)

    res.json({ _id })
  } catch (e) {
    if (e.name == 'ValidationError') {
      const body = FieldValidationError.parseYupValidationErrors(e)
      res.status(400).json(body)
    }
    res.status(500).json({ message: e.message })
  }
}

export default database(handler)