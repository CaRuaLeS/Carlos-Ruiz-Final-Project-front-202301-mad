import styles from "./not-logged.module.scss";

import { useState } from "react";
import { LogIn } from "../login/login";
import { Register } from "../register/register";

export function NotLogged() {
  const [isInLogin, setIsInLogin] = useState(false);

  return (
    <div className={styles.notlogged}>
      <div className={styles.buttons}>
        <button onClick={() => setIsInLogin(false)}>REGISTER</button>
        <button onClick={() => setIsInLogin(true)}>LOGIN</button>
      </div>
      <div className={styles.components}>
        {isInLogin ? (
          <LogIn></LogIn>
        ) : (
          <Register setInLogin={setIsInLogin}></Register>
        )}
      </div>
    </div>
  );
}
export default NotLogged;
