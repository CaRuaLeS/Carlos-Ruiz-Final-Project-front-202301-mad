/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hooks/use-users";
import { User } from "../../model/user";
import { UsersRepo } from "../../services/user-repo";

export function Register() {
  const repo = useMemo(() => new UsersRepo(), []);

  const { userRegister } = useUsers(repo);

  const handlerSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUser = event.currentTarget;

    const registerForm: Partial<User> = {
      username: (formUser.elements[0] as HTMLFormElement).value,
      email: (formUser.elements[1] as HTMLFormElement).value,
      password: (formUser.elements[2] as HTMLFormElement).value,
    };
    const avatar = (formUser.elements[3] as HTMLFormElement).files?.item(0);
    userRegister(registerForm, avatar);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <label>
        username
        <input type="text" name="text" required />
      </label>
      <label>
        email
        <input type="email" name="email" required />
      </label>
      <label>
        password
        <input type="password" name="password" role="textbox" required />
      </label>
      <label>
        avatar
        <input type="file" name="image" />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
