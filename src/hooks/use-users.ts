import { useDispatch, useSelector } from "react-redux";
import { UserStructure } from "../model/user";
import { UsersRepo } from "../services/user-repo";
import { AppDispatch, RootState } from "../store/store";
import { register, login } from "../reducer/users-slice";

export function useUsers(repo: UsersRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const userRegister = async (info: Partial<UserStructure>) => {
    try {
      const data = await repo.create(info, "register");
      dispatch(register(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const userLogin = async (info: Partial<UserStructure>) => {
    try {
      const data = await repo.create(info, "login");
      console.log(data);

      dispatch(login(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return {
    users,
    userRegister,
    userLogin,
  };
}
