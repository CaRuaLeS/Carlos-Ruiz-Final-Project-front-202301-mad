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
      email: (formUSer[0] as HTMLFormElement).value,
      password: (formUSer[1] as HTMLFormElement).value,
    };

    userLogin(loginForm);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <label>
        email
        <input type="email" name="email" required />
      </label>
      <label>
        password
        <input type="password" name="password" required />
      </label>

      <button type="submit">Log In</button>
    </form>
  );
}
