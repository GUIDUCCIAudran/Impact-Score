import { TextField } from "@material-ui/core";

export default function OpenText({ handleChange }) {
  return (
    <div className="container">
      <TextField
        id="standard-basic"
        label=""
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
