import { NextApiResponse } from "next";
import database from "../../storage/database";
import { CustomApiRequest, CustomApiHandler } from "../../utils/types";
import ProffesionalsDAO from "../../storage/proffesionalsDAO";

const handler: CustomApiHandler = (req: CustomApiRequest, res: NextApiResponse) => {
  ProffesionalsDAO.injectDB(req.db)
  
}

export default database(handler)