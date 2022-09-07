import "./TextField.css";

function EmailField(props) {
  return (
    <label htmlFor={props.Id} >
      {props.DisplayName}
      <input
        id={props.Id}
        autoComplete="email"
        className="textfield"
        type="email"
        placeholder="Emailaddress"
        value={props.Value}
        onInput={(e) => props.OnInput(e.target.value)}
        name={props.DisplayName}
        disabled={props.Disabled}
        required
      />
    </label>
  );
}

export default EmailField;
