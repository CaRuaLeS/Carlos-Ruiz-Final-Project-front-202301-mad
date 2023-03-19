import { EscapeRoomStructure, ServerTypeEscapeRoom } from "../model/escaperoom";
import { URL_MAZE_ESCAPEROOMS } from "../variables";
import { RepoEscaperoom } from "./escaperoom-repo-interface";

export class EscaperoomsRepo implements RepoEscaperoom<ServerTypeEscapeRoom> {
  url: string;
  constructor() {
    this.url = URL_MAZE_ESCAPEROOMS;
  }

  async getAll(): Promise<ServerTypeEscapeRoom> {
    const resp = await fetch(this.url);

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    return data;
  }

  async getByTheme(
    themeFilter: EscapeRoomStructure["theme"]
  ): Promise<ServerTypeEscapeRoom> {
    const url = this.url + "/theme/" + themeFilter;
    const resp = await fetch(url);

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    return data;
  }
}
