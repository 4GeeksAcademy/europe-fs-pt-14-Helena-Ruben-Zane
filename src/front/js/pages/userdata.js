import React, { useEffect, useState } from 'react'
import { EventInfoBox } from '../component/eventInfoBox';
import { useNavigate } from 'react-router-dom'
import { TimeCounter } from '../component/timeCounter';

import { UserInsertData } from '../component/userInsertData';
import { UserLevelConnectLink } from '../component/userLevelConectLink';

import { InsertData } from '../component/insertData';
import { InsertLocationLiters } from '../component/inserLocationLiters';
import { SubmitButton } from '../component/submitButton';
import { ShowUserImpact } from '../component/showUserImpact';

import { NavBar } from "../component/navbar";
import userdata_background from "../../img/userdata_background.jpg";





export const Userdata = () => {


  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
      return;
    }
    setUserToken(userToken)

  })

  const logout = async () => {
    localStorage.removeItem("userToken");
    window.location.reload(true);
  };

  return (

    <div>
      <NavBar />
      <div className="hero ">
        <img className="hero__image" src={userdata_background} />
        <div className='user-data-group-box'>
          <div className="user-data-page-left">
            <UserLevelConnectLink />
            <div className="user-impact-data">
              <ShowUserImpact />
              <button className="logout-button" onClick={logout}>LOGOUT</button>
            </div>
          </div>
          <div className="user-data-page-right">
            <TimeCounter />
            <div className="user-location-group">
              <InsertLocationLiters />
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
      <div>
        <EventInfoBox />
      </div>
    </div>
  )
}; 