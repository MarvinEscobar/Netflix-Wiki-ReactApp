import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { ScopedContext } from '../../Contexts/ScopedContextProvider';
import CategoryMenu from "../../Components/TopMenu/CategoryMenu";
import { Routes } from "../../Constants/Environment";
import { getAllCountries, searchTitles } from '../../Data/RapidApi';
import { Firebase, RapidApi } from '../../Constants/Messages';
import { getCountry } from '../../Firebase/FirebaseEntitiesContext';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import ProductGallery from '../../Components/ProductComponents/ProductGallery';
import { Keys } from '../../Constants/Environment';

function Browse() {
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);
  const { setSelectedCountry } = useContext(ScopedContext);
  let [country, setCountry] = useState(null);
  let [countries, setCountries] = useState(null);
  let [data, setData] = useState(null);
  let [movies, setMovies] = useState(null);
  let [series, setSeries] = useState(null);
  let [expiring, setExpiring] = useState(null);

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  const switchDataAsync = useCallback(async (countryItem) => {
    console.log("switching data");
    console.log(countryItem);
    localStorage.setItem(Keys.countryId, countryItem.id);
    setSelectedCountry(countryItem);
    setCountry(countryItem);
    setData(null);
    setMovies(null);
    setExpiring(null);

    setData(await fetchDataAsync({ order_by: 'date', country_list: [countryItem.id], limit: 20 }));
    setMovies(await fetchDataAsync({ order_by: 'date', country_list: [countryItem.id], limit: 20, type: 'movie' }));
    setSeries(await fetchDataAsync({ order_by: 'date', country_list: [countryItem.id], limit: 20, type: 'series' }));
    setExpiring(await fetchDataAsync({ order_by: 'date', country_list: [countryItem.id], limit: 20, expiring: 'true' }));
  }, [setSelectedCountry]);

  useEffect(() => {
    if (!authState.user) {
      handleNavigation(Routes.Login);
    }
    else {
      const fetchData = async () => {
        console.log("fetching data!");
        let countriesResult = await getAllCountries();

        if (countriesResult.Status === RapidApi.Succes) {
          setCountries(countriesResult.Result);
        }

        try {
          //get cached country (id)
          let cachedCountryId = parseInt(localStorage.getItem(Keys.countryId));

          if (cachedCountryId) {
            let cachedCountry = countriesResult.Result.find(x => x.id === cachedCountryId);
            //if id present then get data. 
            if (cachedCountry) {
              switchDataAsync(cachedCountry);
              return;
            }

          }
        }
        catch (e) {
          console.debug(e);
        }
        
        //Else get usercountry from db
        let countryResponse = await getCountry(authState.user.uid);

        if (countryResponse.Status === Firebase.Succes) {
          let countryValue = countriesResult.Result.find(x => x.id === countryResponse.Result.id);
          switchDataAsync(countryValue);
        }
      };
      //If countries is filled then data is already filled
      if (!countries && !country)
        fetchData();
    }
  }, [setCountries, setCountry, setData, handleNavigation, switchDataAsync, authState, countries, country]);

  async function fetchDataAsync(params) {

    let titlesResult = await searchTitles(params);
    return titlesResult.Result;
  }

  return (
    <main className="browse">
      <CategoryMenu />
      <section className="main-container">
        <CountrySelector Id="country" DisplayName="Country" Value={country} Items={countries ?? [{}]} OnChange={async value => switchDataAsync(value)} />
        <ProductGallery Id="all" Href={`/search?country_list=${country?.id}&limit=${country?.tvids}`} Title={!country?.country ? "Loading..." : `Available on Netflix in ${country?.country ?? 0}`} Count={country?.tvids} Data={data} />
        <ProductGallery Id="tmovs" Href={`/search?country_list=${country?.id}&limit=${country?.tmovs}&type=movies`} Title={!country?.country ? "Loading..." : `Movies in ${country?.country ?? 0}`} Count={country?.tmovs} Data={movies} />
        <ProductGallery Id="tseries" Href={`/search?country_list=${country?.id}&limit=${country?.tseries}&type=series`} Title={!country?.country ? "Loading..." : `Series in ${country?.country ?? 0}`} Count={country?.tseries} Data={series} />
        <ProductGallery Id="expiring" Href={`/search?country_list=${country?.id}&limit=${country?.expiring}&expiring=true`} Title={!country?.country ? "Loading..." : `Expiring in ${country?.country ?? 0}`} Count={country?.expiring} Data={expiring} />
      </section>
    </main>
  );
}

export default Browse;
