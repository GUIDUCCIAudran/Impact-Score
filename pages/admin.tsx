import { connectToDatabase } from "../util/mongodb";
import { useCallback, useEffect } from "react";

import { useState } from "react";
import QuestionnaireDetails from "../components/questionnaireDetails";

export default function Admin({ isConnected }) {
  const [isLoading, setLoading] = useState(false);
  const [questionnairesList, setQuestionnairesList] = useState([]);
  const [questionnairesFilled, setQuestionnairesFilled] = useState([]);

  const fetchFilledQuestionnaires = useCallback(async () => {
    if (isConnected) {
      const res = await fetch(
        "http://localhost:3000/api/getFilledQuestionnaire"
      );
      const resJson = await res.json();
      setQuestionnairesFilled(resJson);
    }
  }, []);

  const fetchQuestionaires = useCallback(async () => {
    if (isConnected) {
      const res = await fetch("http://localhost:3000/api/getQuestionnaire");
      const resJson = await res.json();
      setQuestionnairesList(resJson);
    } else return [];
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchFilledQuestionnaires();
    fetchQuestionaires();
    setLoading(false);
  }, []);

  return (
    <div>
      {!isLoading ? (
        questionnairesList.map((questionnaire) => (
          <QuestionnaireDetails
            questionnaire={questionnaire}
            filledQuestionnaires={questionnairesFilled.filter(
              (fquestionnaire) =>
                fquestionnaire.originalQuestionnaireId === questionnaire._id
            )}
          />
        ))
      ) : (
        <div>loader</div>
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
