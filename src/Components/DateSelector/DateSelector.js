function DateSelector(props) {
    return(
    <label htmlFor={props.Id}>
        {props.DisplayName}
        <input autoComplete="on" id={props.Id} type="date" value={props.Value??new Date()} onChange={e=>props.OnChange(e.target.value)} />
    </label>);
    
}
export default DateSelector;