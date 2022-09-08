import './Button.css';

function Button(props) {
  return (
    <button type={props.Type} className={`btn ${props.Class}`} onClick={props.OnClick}>
      {props.Text}
    </button>
  );
}

export default Button;
