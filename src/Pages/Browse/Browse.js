import "./Browse.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import GenresMenu from "../../Components/TopMenu/CategoryMenu";
import { Routes } from "../../Constants/Environment";

function Browse() {
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  useEffect(() => {
    if (!authState.user) {
      handleNavigation(Routes.Login);
    }
  });

  return (
    <main className="browse">
      <CategoryMenu />
      <section className="main-container">
        <div className="location" id="home">
          <h1 id="home">Popular on Netflix</h1>
          <div className="box">
            <ProductCard />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Browse;
