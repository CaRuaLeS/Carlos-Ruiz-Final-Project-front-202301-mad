import { EscapeRoomStructure } from "../model/escaperoom";

export interface RepoEscaperoom<T> {
  getAll(): Promise<T>;
  getByTheme(themeFilter: EscapeRoomStructure["theme"]): Promise<T>;
}
