export default function AnsweredQuestionnaire({ questionnaires }) {
  return (
    <div>
      {questionnaires.length !== 0 ? (
        questionnaires.map((questionnaire) => (
          <div>
            <h3>Score {questionnaire.score}</h3>
          </div>
        ))
      ) : (
        <div> No one answered this questionnaire yet</div>
      )}
    </div>
  );
}
