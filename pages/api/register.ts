import { CustomApiHandler } from "../../utils/types";
import ProfessionalsDAO from "../../storage/professionalsDAO";
import { registerValidationSchema } from '../../utils/validation'
import { handleErrors, database } from '../../middlewares'


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
    handleErrors(e, res)
  }
}

export default handler