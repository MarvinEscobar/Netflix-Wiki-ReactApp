import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import CategoryMenu from "../../Components/TopMenu/CategoryMenu";
import { Routes } from "../../Constants/Environment";
import { getDetailsById } from '../../Data/RapidApi';
import { RapidApi } from '../../Constants/Messages';
import Button from '../../Components/Button/Button';

function ProductDetails(props) {
    const { netflix_id } = useParams();
    const history = useHistory();
    const { ...authState } = useContext(AuthenticationStateContext);
    let [data, setData] = useState(null);
    let [errorMessage, setErrorMessage] = useState(null);

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
                try {

                    let response = await getDetailsById(netflix_id);
                    if (response.Status === RapidApi.Succes) {
                        setData(response.Result);
                    }
                    else {
                        setErrorMessage(RapidApi.Default);
                    }

                } catch (e) {
                    setErrorMessage(RapidApi.Default);
                }
            };

            if (!data) {
                fetchData();
            }

        }
    }, [handleNavigation, data, netflix_id, authState]);

    let title = data?.title?.replace('&#39;', '\'')??'';

    return (
        <main className="browse">
            <CategoryMenu Prefix={Routes.Browse} />
            <section className="main-container">
                <div className="card-container">

                    {data && !errorMessage ? (<div className="card">
                        <img className="col" src={data.large_image} alt="cover" />
                        <div className="inner-container col">
                            <h2><b>{title}</b></h2>
                            <p>{data.title_type}</p>
                            <h3>Summary</h3>
                            <sub>{data.synopsis}</sub>
                            <br />
                            <p>{data.maturity_label}</p>
                            <p>Latest date {data.latest_date}</p>
                            <p>{data.alt_votes} votes</p>
                            <Button Class="btn-primary" Text={"Previous page"} Type="button" OnClick={() => history.goBack()} />
                        </div>
                    </div>
                    ) : (!data && errorMessage ? (<p className="errorMessage">{errorMessage}</p>) : (<p className="errorMessage">No data</p>))}
                </div>
            </section>
        </main>

    );
}

export default ProductDetails;