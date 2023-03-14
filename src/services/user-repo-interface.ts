import { UserStructure } from "../model/user";

export interface Repo<T> {
  create(userInfo: Partial<UserStructure>, urlPath: string): Promise<T>;
  update(
    userInfo: Partial<UserStructure>,
    urlPath: string,
    token: string
  ): Promise<T>;
}
