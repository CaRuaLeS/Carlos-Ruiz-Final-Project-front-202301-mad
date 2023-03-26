/* eslint-disable jsx-a11y/no-redundant-roles */
import styles from "../register/register.module.scss";

import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hooks/use-users";
import { User } from "../../model/user";
import { UsersRepo } from "../../services/user-repo";

export function LogIn() {
  const repo = useMemo(() => new UsersRepo(), []);

  const { userLogin } = useUsers(repo);

  const handlerSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formUSer = event.currentTarget;

    const loginForm: Partial<User> = {
      email: (formUSer.elements[0] as HTMLFormElement).value,
      password: (formUSer.elements[1] as HTMLFormElement).value,
    };

    userLogin(loginForm);
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.container}>
      <label>
        EMAIL
        <input type="email" name="email" required />
      </label>
      <label>
        PASSWORD
        <input type="password" name="password" role="textbox" required />
      </label>

      <button className={styles.submit} type="submit">
        LOGIN
      </button>
    </form>
  );
}
