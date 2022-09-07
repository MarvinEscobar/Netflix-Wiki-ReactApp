import './Button.css';

function Button(props) {
  return (
    <button type={props.Type} className="btn" onClick={props.OnClick}>
      {props.Text}
    </button>
  );
}

export default Button;
