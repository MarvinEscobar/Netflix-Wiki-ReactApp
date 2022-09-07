function EditForm( props) {
  return (
    <form className="editform" onSubmit={props.OnSubmit}>
      {props.children}
    </form>
  );
}

export default EditForm;