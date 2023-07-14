import { Outlet, NavLink, Link } from "react-router-dom";

import github from "../../assets/github.svg";

import styles from "./Layout.module.css";

import React, { useState, useEffect } from 'react';

async function getUserInfo() {
    try {          
      const response = await fetch('.auth/me');
      const data = await response.json();
      return data[0].userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUserRole() {
    try {          
        const response = await fetch('.auth/me');
        const data = await response.json();          
        const role = data.clientPrincipal.userRoles[0];
        //alert(role);

      return role;
    } catch (error) {
      console.log(error);
      alert('error' + error)
      return null;
    }
  }

  async function getUserName() {
    try {          
      const response = await fetch('.auth/me');
      const data = await response.json();          
      //alert('data.clientPrincipal.userId');
      const email = data.clientPrincipal.userDetails;
      //alert(email);
      //alert(data.clientPrincipal.claims[8].val);
      //alert(data.clientPrincipal.claims[8]);
      //const name = data.clientPrincipal.claims.find(claim => claim.typ === "name")?.val;
      //const name = data.clientPrincipal.claims[8].val;
      return email.replace(/@[^@]+$/, '');
    } catch (error) {        
      console.log(error);
      return null;
    }
  }


const Layout = () => {

    const [userInfo, setUserInfo] = useState(null);  
    useEffect(() => {
      getUserInfo().then((userId) => {
        setUserInfo(userId);
      });      
    }, []);

    const [userName, setUserName] = useState(null);      
    useEffect(() => {
        getUserName().then((name) => {        
        setUserName(name);
      });      
    }, []);

    const [userRole, setUserRole] = useState(null);      
    useEffect(() => {
        getUserRole().then((role) => {        
        setUserRole(role);
      });      
    }, []);

    return (            
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>JeffGPT</h3>
                    </Link>
                    <nav>
                        <ul className={styles.headerNavList}>
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Chat
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <NavLink to="/qa" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Ask a question
                                </NavLink>
                            </li>

                            {(userName !== null ? userName : '').includes('emerson') ? (
                            <li className={styles.headerNavLeftMargin}>
                                <NavLink to="/ul" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Index your data
                                </NavLink>
                            </li>        
                            ) : ( <li></li>)} 

                            <li className={styles.headerNavLeftMargin}>
                                <a href="https://github.com/jeffreygran/Enterprise-ChatGPT_v4" target={"_blank"} title="Jeffrey Gran's Repository Link">
                                    <img
                                        src={github}
                                        alt="Github logo"
                                        aria-label="Link to github repository"
                                        width="20px"
                                        height="20px"
                                        className={styles.githubLogo}
                                    />
                                </a>
                            </li>

                            {userInfo ? (
                            <li className={styles.headerNavLeftMargin}>
                                <a href="/.auth/login/aad" title="Login" className={styles.headerNavPageLinkActive} >
                                    Login                                    
                                </a>                                
                            </li>
                            ) : (
                            <li className={styles.headerNavLeftMargin}>
                                <a href="/.auth/logout" title="Logout" className={styles.headerNavPageLinkActive} >
                                    Hi {userName}! | Logout
                                </a>    
                            </li>                                                     
                            )}

                        </ul>
                    </nav>
                    <h4 className={styles.headerRightText}>Azure OpenAI + Enterprise Data v7</h4>
                </div>
            </header>

            <Outlet />
        </div>        
    );
};

export default Layout;
