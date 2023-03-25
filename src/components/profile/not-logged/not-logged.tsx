import { useState } from "react";
import { LogIn } from "../../login/login";
import { Register } from "../../register/register";

export function NotLogged() {
  const [isInLogin, setIsInLogin] = useState(false);

  return (
    <>
      <button onClick={() => setIsInLogin(false)}>Register</button>
      <button onClick={() => setIsInLogin(true)}>Login</button>
      {isInLogin ? <LogIn></LogIn> : <Register></Register>}
    </>
  );
}
export default NotLogged;
