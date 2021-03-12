import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ChapterDetails from "./chapterDetails";
import AnsweredQuestionnaire from "./answeredQuestionnaire";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function QuestionnaireDetails({
  questionnaire,
  filledQuestionnaires,
}) {
  const [view, setView] = useState("chapters");
  const classes = useStyles();

  console.log(filledQuestionnaires);

  const switchView = () => {
    switch (view) {
      case "chapters":
        return (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ChapterDetails
                chapters={questionnaire.chapters}
              ></ChapterDetails>
            </Paper>
          </Grid>
        );
      case "answers":
        return (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <AnsweredQuestionnaire questionnaires={filledQuestionnaires} />
            </Paper>
          </Grid>
        );
    }
  };

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{questionnaire.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper
              onClick={() => setView("chapters")}
              className={classes.paper}
            >
              Chapters ({questionnaire.chapters.length})
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper onClick={() => setView("answers")} className={classes.paper}>
              Answers
            </Paper>
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Something</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Other Option</Paper>
          </Grid> */}
        </Grid>
        <Grid container spacing={3}>
          {switchView()}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
