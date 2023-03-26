import styles from "./profile.module.scss";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducer/users-slice";
import { AppDispatch, RootState } from "../../store/store";
import { LoggedAccount } from "../profile-logged/logged";
import NotLogged from "../profile-not-logged/not-logged";

export function Profile() {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const handlerLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div>{users.extraInfo.token ? <LoggedAccount /> : <NotLogged />}</div>
        <button className={styles.logout} onClick={handlerLogout}>
          LOG OUT
        </button>
      </div>
    </>
  );
}
export default Profile;
