import { CustomApiHandler } from "../../utils/types";
import ProfessionalsDAO from "../../storage/professionalsDAO";
import { FieldValidationError, registerValidationSchema } from '../../utils/validation'
import database from '../../middlewares/database'


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
    await database(req, res, ProfessionalsDAO)

    const formValues = req.body
    await registerValidationSchema.validate(formValues, { abortEarly: false })

    const _id = await ProfessionalsDAO.addProfessional(formValues)

    res.json({ _id })
  } catch (e) {
    if (e.name == 'ValidationError') {
      const body = FieldValidationError.parseYupValidationErrors(e)
      res.status(400).json(body)
    }
    res.status(500).json({ message: e.message })
  }
}

export default handler