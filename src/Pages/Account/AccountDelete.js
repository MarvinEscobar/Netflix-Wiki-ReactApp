import './Account.css';
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import {Routes} from '../../Constants/Environment';
import {deleteAsync} from '../../Firebase/FirebaseEntitiesContext';

function AccountDelete() {
    const history = useHistory();
    const {logout, ...authState } = useContext(AuthenticationStateContext);

    async function handleDelete(){
      let isSucces = await Promise.resolve(deleteAsync(authState.user));
      
      if(isSucces){
        logout();
        handleNavigation(Routes.Home);
      }
    }

    function handleNavigation(path) {
      history.push(path);
      history.goForward();
    }

    useEffect(() => {
      if (!authState.user) {
        handleNavigation(Routes.Login);
      }
    });
    
    return(
        <main className="account">
        <header className="txt-center"></header>
  
        <section>
          <div className="editform">
            
            <label>Delete account?</label>
            <Button Text={"Delete"} OnClick={()=> handleDelete()} />
            <Button Text={"Back"} Type="button" OnClick={()=> history.goBack()} />
          </div>
        </section>
      </main>
    );
}

export default AccountDelete;