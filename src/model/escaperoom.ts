export type EscapeRoomStructure = {
  id: string;
  name: string;
  players: string;
  difficulty: "Easy" | "Medium" | "Hard";
  theme: string;
  description?: string;
  images?: string[];
};

export type ServerTypeEscapeRoom = {
  results: EscapeRoomStructure[];
};

export class EscapeRoom implements EscapeRoomStructure {
  constructor(
    public id: string,
    public name: string,
    public players: string,
    public difficulty: "Easy" | "Medium" | "Hard",
    public theme: string,
    public description: string,
    public images: string[]
  ) {}
}
