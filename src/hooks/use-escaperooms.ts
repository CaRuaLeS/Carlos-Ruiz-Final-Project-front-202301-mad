import { useDispatch, useSelector } from "react-redux";
import { EscapeRoomStructure } from "../model/escaperoom";
import {
  getAllEscaperooms,
  getByThemeEscaperooms,
} from "../reducer/escaperooms-slice";
import { EscaperoomsRepo } from "../services/escaperoom-repo";
import { AppDispatch, RootState } from "../store/store";

export function useEscapeRooms(repo: EscaperoomsRepo) {
  const escaperooms = useSelector((state: RootState) => state.escaperooms);
  const dispatch = useDispatch<AppDispatch>();

  const escaperoomGetAll = async () => {
    try {
      const data = await repo.getAll();
      console.log(data);
      dispatch(getAllEscaperooms(data.results));
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  const escaperoomGetByTheme = async (theme: EscapeRoomStructure["theme"]) => {
    try {
      const data = await repo.getByTheme(theme);
      dispatch(getByThemeEscaperooms(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return {
    escaperooms,
    escaperoomGetAll,
    escaperoomGetByTheme,
  };
}
