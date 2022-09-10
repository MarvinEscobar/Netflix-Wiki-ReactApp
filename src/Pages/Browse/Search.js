import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";
import SearchGallery from '../../Components/ProductComponents/SearchGallery';
import { searchTitles } from '../../Data/RapidApi';

function Search() {
  let queryParams = new URLSearchParams(window.location.search);
  let country_list = queryParams.get("country_list");
  let limit = queryParams.get("limit");
  let expiring = queryParams.get("expiring");
  let type = queryParams.get("type");
  let title = queryParams.get("title");

  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);

  let [data, setData] = useState(null);
  console.log("Reloading");

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  const fetchData = useCallback(async () => {

    setData(null);

    let params = {
      order_by: 'date'
    }

    if (country_list)
      params["country_list"] = [country_list];

    if (limit)
      params["limit"] = limit;

    if (expiring)
      params["expiring"] = expiring;

    if (type)
      params["type"] = type;

    if (title)
      params["title"] = title;

    setData(await fetchDataAsync(params));
  }, [country_list, expiring, limit, title, type]);

  useEffect(() => {
    return history.listen((location) => {
      fetchData();
    })
  }, [history, fetchData])

  useEffect(() => {
    if (!authState.user) {
      handleNavigation(Routes.Login);
    }
    else {

      if (!data)
        fetchData();
    }
  }, [setData, handleNavigation, fetchData, data, authState]);

  async function fetchDataAsync(params) {

    let titlesResult = await searchTitles(params);
    return titlesResult.Result;
  }

  return (
    <main className="browse">
      <section className="main-container">
        <SearchGallery Id="search-all" Title={`Searchresults `} Count={data?.length ?? 0} Data={data} />
      </section>
    </main>
  );
}

export default Search;
