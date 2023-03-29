import Swal from "sweetalert2";
import { ServerTypeUser, UserStructure } from "../model/user";
import { URL_MAZE_USERS } from "../variables";
import { RepoUser } from "./user-repo-interface";

export class UsersRepo implements RepoUser<ServerTypeUser> {
  url: string;
  constructor() {
    this.url = URL_MAZE_USERS;
  }

  async create(
    userInfo: Partial<UserStructure>,
    urlExtraPath: string
  ): Promise<ServerTypeUser> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (resp.ok)
      Swal.fire({
        icon: "success",
        timer: 2000,
        confirmButtonColor: "rgb(69, 69, 69",
        title: ` User ${resp.statusText}`,
      });

    if (!resp.ok) {
      Swal.fire({
        icon: "error",
        timer: 2000,
        title: `User ${resp.statusText}`,
      });
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();

    return data;
  }

  async readId(token: string): Promise<ServerTypeUser> {
    const url = this.url + "/profile";

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const data = await resp.json();

    return data;
  }

  async update(
    userInfo: Partial<UserStructure>,
    urlExtraPath: string,
    token: string
  ): Promise<ServerTypeUser> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();

    return data;
  }
}
