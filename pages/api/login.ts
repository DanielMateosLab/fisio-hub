import { NextApiResponse } from "next";
import database from "../../storage/database";
import { CustomApiRequest, CustomApiHandler } from "../../utils/types";
import ProffesionalsDAO from "../../storage/proffesionalsDAO";

const handler: CustomApiHandler = (req: CustomApiRequest, res: NextApiResponse) => {
  ProffesionalsDAO.injectDB(req.db)
  // TODO: Validation with Yup (extract Yup validation schemas to utils)
  res.status(400).json({ error: 'Mock Error' })
}

export default database(handler)