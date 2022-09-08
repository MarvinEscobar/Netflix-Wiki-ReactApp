import React, { useState, useEffect } from "react";

function CountrySelector(props) {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (props.Value && props.Items) {
      let country = props.Items.find(x => x.id === props.Value.id);
     
      setSelected(JSON.stringify(country));
    }
  }, [props]);

  return (
    <label htmlFor={props.Id}>
      {props.DisplayName}
      <select
        id={props.Id}
        value={selected}
        onChange={(e) => { setSelected(e.target.value); props.OnChange(JSON.parse(e.target.value)); }}
      >
        <option value={null} disabled={selected}>Choose a country</option>
        {props.Items ? props.Items.map((item, index) => {
          return (
            <option id={`opt-id-${index}`} key={`opt-key-${index}`} value={JSON.stringify(item)}> {item.country}</option>
          );
        })
          :
          <></>
        }
      </select>
    </label>
  );

}

export default CountrySelector;
