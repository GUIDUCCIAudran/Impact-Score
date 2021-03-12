import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const questionaires = await db.collection("filledquestionnaires").find({}).toArray();
  res.status(200).json(questionaires)
};
