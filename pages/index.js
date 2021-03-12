import { connectToDatabase } from "../util/mongodb";
import { useCallback, useEffect, useState } from "react";
import Chapter from "../components/chapter";
import FinalPage from "../components/finalPage";
import axios from "axios";

export default function Home({ isConnected }) {
  const [isLoading, setLoading] = useState(false);
  const [throwFinal, setThrowFinal] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [questionnaire, setQuestionnaire] = useState({});
  const [filledQuestionnaire, setFilledQuestionnaire] = useState({
    _id: Date.now().toString(),
    chapters: [],
    company: {},
    isComplete: false,
    score: 0,
    acceptedRGPD: true,
  });

  const fetchQuestionaires = useCallback(async () => {
    if (isConnected) {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/getQuestionnaire");
      const resJson = await res.json();
      setQuestionnaire(resJson[0]);
      setLoading(false);
    } else return [];
  }, []);

  const postFilledQuestionnaire = useCallback(async () => {
    if (isConnected) {
      await axios.post(
        "http://localhost:3000/api/postQuestionnaire",
        filledQuestionnaire
      );
    }
  });

  useEffect(() => {
    fetchQuestionaires();
  }, []);

  useEffect(() => {
    setFilledQuestionnaire({
      ...filledQuestionnaire,
      originalQuestionnaireId: questionnaire._id,
    });
  }, [questionnaire]);

  const nextChapter = (chapter) => {
    const newQuestionnaire = {
      ...filledQuestionnaire,
      chapters: [...filledQuestionnaire.chapters, chapter],
    };
    setFilledQuestionnaire(newQuestionnaire);
    if (questionnaire.chapters[chapterIndex + 1])
      setChapterIndex(chapterIndex + 1);
    else {
      postFilledQuestionnaire();
      setThrowFinal(true);
    }
  };

  return (
    <div className="container">
      {throwFinal ? (
        <FinalPage></FinalPage>
      ) : isLoading ? (
        <div>Loading</div>
      ) : questionnaire && questionnaire?.chapters ? (
        <Chapter
          chapter={questionnaire.chapters[chapterIndex]}
          nextChapter={nextChapter}
        ></Chapter>
      ) : (
        <div> Error while fetching data from db</div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
