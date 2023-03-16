import { useState } from "react";
import { LogIn } from "../login/login";
import { Register } from "../register/register";

export function Profile() {
  const [isInLogin, setIsInLogin] = useState(false);

  const handlerChange = (condition: boolean) => {
    setIsInLogin((condition = !condition));
  };

  return (
    <>
      <h2>Profile</h2>
      <button onClick={() => handlerChange(isInLogin)}>Register</button>
      <button onClick={() => handlerChange(isInLogin)}>Login</button>
      {isInLogin ? <LogIn></LogIn> : <Register></Register>}
    </>
  );
}
export default Profile;
