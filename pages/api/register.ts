import database from "../../storage/database";
import { CustomApiHandler } from "../../utils/types";
import ProffesionalsDAO from "../../storage/proffesionalsDAO";
import { registerValidationSchema, ValidationErrorBody } from '../../utils/validation'

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
    const formValues = req.body

    await registerValidationSchema.validate(formValues, { abortEarly: false })

    ProffesionalsDAO.injectDB(req.db)
    res.status(400).json({ message: 'mock error'})
  } catch (e) {
    if (e.name == 'ValidationError') {
      const error = new ValidationErrorBody(e)
      res.status(400).json(error)
    }
    res.status(500).json({ message: e.message })
  }
}

export default database(handler)