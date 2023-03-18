export type UserStructure = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  token?: string;
};

export type ServerTypeUser = {
  results: UserStructure[];
};

export class User implements UserStructure {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public avatar: string
  ) {}
}
