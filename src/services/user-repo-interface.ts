import { UserStructure } from "../model/user";

export interface RepoUser<T> {
  create(userInfo: Partial<UserStructure>, urlPath: string): Promise<T>;
  update(
    userInfo: Partial<UserStructure>,
    urlPath: string,
    token: string
  ): Promise<T>;
}
