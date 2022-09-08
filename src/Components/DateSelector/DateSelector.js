function DateSelector(props) {
    return(
    <label htmlFor={props.Id}>
        {props.DisplayName}
        <input autoComplete="on" id={props.Id} type="date" value={props.Value??new Date().toISOString().slice(0, 10)} onChange={e=>{ props.OnChange(e.target.value)}} />
    </label>);
    
}
export default DateSelector;