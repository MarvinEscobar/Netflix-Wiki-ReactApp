function DateSelector(props) {
    console.log("props.Value");
    console.log(props.Value);
    return(
    <label htmlFor={props.Id}>
        {props.DisplayName}
        <input autoComplete="on" id={props.Id} type="date" value={props.Value??new Date().toISOString().slice(0, 10)} onChange={e=>{console.log(e.target.value); props.OnChange(e.target.value)}} />
    </label>);
    
}
export default DateSelector;