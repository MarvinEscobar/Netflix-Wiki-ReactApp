import "./TextField.css";

function PasswordField(props) {
  return (
    <label htmlFor={props.Id}>
      {props.DisplayName}
      <input
      id={props.Id}
        autoComplete={props.AutoComplete}
        className="textfield"
        type="password"
        placeholder={props.Placeholder}
        value={props.Value}
        onInput={(e) => props.OnInput(e.target.value)}
        required
      />
    </label>
  );
}

export default PasswordField;
