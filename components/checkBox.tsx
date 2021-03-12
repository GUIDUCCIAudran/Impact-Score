import { Checkbox } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function CheckBox({ choices, handleChange }) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setChecked(
      choices.map((choice) => ({
        _id: choice._id,
        checked: false,
        weight: choice.weight,
      }))
    );
  }, []);

  const onBoxChecked = (index) => {
    const checkedNewArray = checked;
    checkedNewArray[index].checked = !checkedNewArray[index].checked;

    setChecked(checkedNewArray);
    handleChange(checked);
  };

  return (
    <div>
      {choices.map((choice, index) => (
        <div key={choice._id}>
          {choice.text}
          <Checkbox
            color="primary"
            value={choice._id}
            onChange={(e) => onBoxChecked(index)}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      ))}
    </div>
  );
}
