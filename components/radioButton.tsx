import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useState } from "react";

export default function RadioButton({ choices, handleChange }) {
  const [value, setValue] = useState("");

  const handleChangeButton = (event) => {
    setValue(event.target.value);
    handleChange(choices.find((choice) => choice._id === event.target.value));
  };

  return (
    <div className="container">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label=""
          name=""
          value={value}
          onChange={handleChangeButton}
        >
          {choices.map((choice) => (
            <FormControlLabel
              key={choice._id}
              value={choice._id}
              control={<Radio />}
              label={choice.text}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
