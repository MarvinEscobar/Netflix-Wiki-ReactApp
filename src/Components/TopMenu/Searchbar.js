import './TopMenu.css';
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ScopedContext } from '../../Contexts/ScopedContextProvider';
import Search from '../../Resources/Images/Search.svg';

function Searhbar() {
    const { selectedCountry } = useContext(ScopedContext);
    const history = useHistory();
    let [searchArgs, setSearchArgs] = useState('');

    async function handleSearch() {
        console.log(searchArgs);
        if (searchArgs && searchArgs !== '') {
            history.push(`/search?country_list=${selectedCountry?.id}&limit=${selectedCountry?.tvids}&title=${searchArgs}`);
            history.goForward();
        }

    }

    return (
        <form id="searchform" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <input id="searchinput" type="text" placeholder="Search.." name="search" onInput={e =>{setSearchArgs(e.target.value);} } />
            <button id="searchbutton" type="submit"><img className="search-img" src={Search} alt="Loading.." /></button>
        </form>
    );
}

export default Searhbar;