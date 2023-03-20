import { EscapeRoomStructure } from "../model/escaperoom";

export interface RepoEscaperoom<T> {
  getAll(): Promise<T>;
  getById(roomId: string): Promise<T>;
  getByTheme(themeFilter: EscapeRoomStructure["theme"]): Promise<T>;
}
