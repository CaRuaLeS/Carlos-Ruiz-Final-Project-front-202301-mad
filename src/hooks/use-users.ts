import { useDispatch } from "react-redux";
import { UserStructure } from "../model/user";
import { UsersRepo } from "../services/user-repo";
import { AppDispatch } from "../store/store";
import { register, login } from "../reducer/users-slice";

export function useUsers(repo: UsersRepo) {
  const dispatch = useDispatch<AppDispatch>();

  const userRegister = async (info: Partial<UserStructure>) => {
    try {
      const data = await repo.create(info, "register");
      dispatch(register(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const userLogin = async (info: Partial<UserStructure>) => {
    try {
      const data = await repo.create(info, "login");
      dispatch(login(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    userRegister,
    userLogin,
  };
}
