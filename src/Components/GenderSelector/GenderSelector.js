import React, { useState, useEffect } from "react";

function GenderSelector(props) {
  const [selected, setSelected] = useState(props.Value);

  useEffect(()=>{
    if(props.Value){
      setSelected(props.Value??'');
    }
  },[props.Value]);

  return (
    <label htmlFor={props.Id}>
      {props.DisplayName}
      <select id={props.Id} value={selected??''} onChange={(e) => {setSelected(e.target.value);props.OnChange(e.target.value);}}>
        <option value={''} > Choose gender</option>
        <option value={"Male"} > Male</option>
        <option value={"Female"} > Female</option>
        <option value={"Other"}> Other</option>
      </select>
    </label>
  );
}

export default GenderSelector;
