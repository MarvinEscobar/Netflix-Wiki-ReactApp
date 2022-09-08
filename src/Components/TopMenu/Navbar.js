import "./TopMenu.css";
import { menuItems } from "../../Resources/Configurations/NavConfig";
import MenuItems from "../MenuItems/MenuItems";
import Button from "../Button/Button";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";

function Navbar() {
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);

  function handleNavigation(path) {
    history.push(path);
    history.goForward();
  }

  return (
    <nav>
      <ul className="menus">

        {authState.user ? (
          <>
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
              {authState.user.email}
            </li>
          </>
        ) : (
          <Button
            Text={"Login"}
            OnClick={() => handleNavigation(Routes.Login)}
          />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
