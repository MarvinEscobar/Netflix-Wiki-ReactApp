function ErrorField(props) {
  if (props.ErrorMessage) return <div className="errorMessage">{props.ErrorMessage}</div>;
  else return(<></>);
}

export default ErrorField;