import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import CategoryMenu from "../../Components/TopMenu/CategoryMenu";
import { Routes } from "../../Constants/Environment";
import { getAllCountries, searchTitles } from '../../Data/RapidApi';
import { Firebase, RapidApi } from '../../Constants/Messages';
import { getCountry } from '../../Firebase/FirebaseEntitiesContext';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';

function Browse() {
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);
  let [country, setCountry] = useState(null);
  let [countries, setCountries] = useState(null);
  let [data, setData] = useState([]);

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  useEffect(() => {
    if (!authState.user) {
      handleNavigation(Routes.Login);
    }
    else {
      const fetchData = async () => {
        let countriesResult = await getAllCountries();
        if (countriesResult.Status === RapidApi.Succes) {
          setCountries(countriesResult.Result);
        }

        let countryResponse = await getCountry(authState.user.uid);
        if (countryResponse.Status === Firebase.Succes) {
          setCountry(countryResponse.Result);

          let titlesResult = await searchTitles({ country_list: [countryResponse.Result.id] })
          if (titlesResult.Status === RapidApi.Succes) {

            setData(titlesResult.Result);
          }
        }
      };
      if (!countries && !country)
        fetchData();
    }
  }, [setCountries, setCountry, setData, handleNavigation, authState, countries, country]);

  async function switchData(countryItem) {
    setCountry(countryItem);
    let titlesResult = await searchTitles({ country_list: [countryItem.id] })
    if (titlesResult.Status === RapidApi.Succes) {
      setData(titlesResult.Result);
    }

  }

  return (
    <main className="browse">
      <CategoryMenu />
      <section className="main-container">
        <CountrySelector Id="country" DisplayName="Country" Value={country} Items={countries ?? [{}]} OnChange={value => switchData(value)} />
        <div className="location" id="home">
          <h1 id="home">Popular on Netflix {`Totaal(${data.length})`}</h1>
          <div className="box">
            {data ? data.map((item, index) => {
              return (
                <ProductCard id={`p1-id-${index}`} Id={`p1-id-${index}`} key={`p1-key-${index}`} Value={item} />
              );
            })
              :
              <></>
            }
          </div>
        </div>
      </section>
    </main>
  );
}

export default Browse;
