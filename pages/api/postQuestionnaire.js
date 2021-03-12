import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    await db
      .collection("filledquestionnaires")
      .insertOne({ ...req.body, postDate: Date.now() });
    res.status(200).json({ message: "Questionnaire saved" });
  } catch (err) {
    res.status(400);
  }
};
