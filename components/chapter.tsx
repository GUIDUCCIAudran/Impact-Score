import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import CheckBox from "./checkBox";
import OpenText from "./openText";
import RadioButton from "./radioButton";

export default function Chapter({ chapter, nextChapter }) {
  const [questionArray, setQuestionArray] = useState(0);
  const [filledChapter, setFilledChapter] = useState({});
  const [questionValue, setQuestionValue] = useState([]);

  useEffect(() => {
    setFilledChapter(chapter);
  }, []);

  const handleChange = (value) => {
    setQuestionValue(value);
  };

  const getWeight = () => {
    if (questionValue.weight) {
      return questionValue.weight;
    }
    return 0;
  };

  const nextQuestion = () => {
    const tmpArray = filledChapter;
    tmpArray.questions[questionArray] = {
      ...tmpArray.questions[questionArray],
      answered: questionValue,
      weight: getWeight(),
    };
    setFilledChapter(tmpArray);
    if (chapter.questions[questionArray + 1])
      setQuestionArray(questionArray + 1);
    else {
      setQuestionArray(0);
      nextChapter(filledChapter);
    }
  };

  const questionSwitch = (question) => {
    switch (question.questionType) {
      case "RadioButton":
        return (
          <div className="container">
            <h3>{question.actionDescription}</h3>
            <RadioButton
              choices={question.answers}
              handleChange={handleChange}
            ></RadioButton>
          </div>
        );
      case "CheckBox":
        return (
          <div className="container">
            <h3>{question.actionDescription}</h3>
            <CheckBox
              choices={question.answers}
              handleChange={handleChange}
            ></CheckBox>
          </div>
        );
      case "OpenText":
        return (
          <div className="">
            <h3>{question.actionDescription}</h3>
            <OpenText handleChange={handleChange} />
          </div>
        );
      default:
        return <div>Yes</div>;
    }
  };

  return (
    <div>
      <h1>{chapter.text}</h1>
      {questionSwitch(chapter.questions[questionArray])}
      <Button variant="contained" onClick={nextQuestion}>
        Continue
      </Button>
    </div>
  );
}
