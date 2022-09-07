import "./TextField.css";

function TextField(props) {
  return (
    <label htmlFor={props.Id}>
      {props.DisplayName}
      <input
        id={props.Id}
        className="textfield"
        type="text"
        placeholder={props.Placeholder}
        value={props.Value??''}
        onInput={(e) => props.OnInput(e.target.value)}
        name={props.DisplayName}
      />
    </label>
  );
}

export default TextField;
