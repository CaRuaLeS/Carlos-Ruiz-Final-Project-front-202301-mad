import { UserStructure } from "../model/user";
import { UsersRepo } from "./user-repo";

describe("Given the users repo", () => {
  let repo: UsersRepo;

  beforeEach(() => {
    repo = new UsersRepo();
  });

  describe("when we call the create function", () => {
    test("then", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.create({} as UserStructure, "/test");
      expect(result).toEqual(mockValue);
    });
  });
});
