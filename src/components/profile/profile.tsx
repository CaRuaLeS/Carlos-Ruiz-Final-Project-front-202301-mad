import { LogIn } from "../login/login";
import { Register } from "../register/register";

export function Profile() {
  return (
    <>
      <h2>Profile</h2>
      <Register></Register>;<LogIn></LogIn>
    </>
  );
}
export default Profile;
