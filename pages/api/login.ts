import { CustomApiHandler } from "../../utils/types"
import ProffesionalsDAO from "../../storage/professionalsDAO"
import { loginValidationSchema } from '../../utils/validation'
import { runMiddlewares, database, handleErrors } from '../../middlewares'
import ProfessionalsDAO from '../../storage/professionalsDAO'


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
    await runMiddlewares(req, res, () => database(req, res, ProfessionalsDAO))

    let formValues = req.body
    await loginValidationSchema.validate(formValues, {abortEarly: false})

    const _id = await ProffesionalsDAO.loginProfessional(formValues)

    res.json({ _id })
  } catch (e) {
    handleErrors(e, res)
  }
}

export default handler