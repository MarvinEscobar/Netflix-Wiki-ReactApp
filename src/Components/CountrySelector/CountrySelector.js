import React, { useState, useEffect } from "react";

function CountrySelector(props) {
  const [selected, setSelected] = useState('');

  useEffect(()=>{
    if(props.Value){
    setSelected(props.Value);
  }
  },[props.Value]);
  
  return (
    <label htmlFor={props.Id}>
      {props.DisplayName}
      <select
        id={props.Id}
        value={selected }
        onChange={(e) => { setSelected(e.target.value); props.OnChange(e.target.value);}}
      >
        <option value={null} disabled={selected}>Choose a country</option>
        {props.Items.map((item, index) => {
          return (
            <option id={`opt-id-${index}`} key={`opt-key-${index}`} value={item.countrycode}> {item.country}</option>
          );
        })}
      </select>
    </label>
  );
}

export default CountrySelector;
