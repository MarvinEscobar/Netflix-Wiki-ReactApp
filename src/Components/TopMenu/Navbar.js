import "./TopMenu.css";
import { menuItems } from "../../Resources/Configurations/NavConfig";
import MenuItems from "../MenuItems/MenuItems";
import Button from "../Button/Button";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";
import Searhbar from './Searchbar';
import { getAccount } from "../../Firebase/FirebaseEntitiesContext";
import { Firebase } from "../../Constants/Messages";

function Navbar() {
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);
  const location = useLocation();
  const [account, SetAccount] = useState(null);

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  useEffect(() => {
    if (authState?.user?.uid) {
      let fetchData = async () => {
        let response = await getAccount(authState.user.uid);
        
        if (response.Status === Firebase.Succes) {
          SetAccount(response.Result);
        }
      }

      if(!account )
        fetchData();
    }
    
  }, [account, authState, handleNavigation]);

  return (
    <nav id="navigation-area">
      <ul className="menus">
        {authState.user ? (
          <>
            <Searhbar />
            {menuItems.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems items={menu} key={`menu-${index}`} depthLevel={depthLevel} />
              );
            })}
            <li
              id="userlnk"
              className=""
              onClick={() => handleNavigation(Routes.Profile)}
            >
              {account ? `Hello ${account?.firstname} ${account?.surname}` : "Loading account..."}
            </li>
          </>
        ) : (location.pathname === Routes.Login ?
          (
            <Button Class="btn-primary"
              Text={"Register"}
              OnClick={() => handleNavigation(Routes.Register)}
            />
          )
          :
          (<>
            <Button Class="btn-secondary"
              Text={"Register"}
              OnClick={() => handleNavigation(Routes.Register)}
            />
            <Button Class="btn-primary"
              Text={"Login"}
              OnClick={() => handleNavigation(Routes.Login)}
            />
          </>
          )
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
