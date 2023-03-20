/* eslint-disable testing-library/no-await-sync-query */
import { EscaperoomsRepo } from "./escaperoom-repo";

describe("Given the escaperoom repo", () => {
  let repo: EscaperoomsRepo;

  beforeEach(() => {
    repo = new EscaperoomsRepo();
  });

  describe("when we call the getAll function", () => {
    test("then if fetch is OK it should return the data", async () => {
      const mockValue = { test: 1 };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.getAll();
      expect(result).toEqual(mockValue);
    });
    test("then if fetch is NOT OK it throw", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.getAll();
      await expect(result).rejects.toThrow();
    });
  });

  describe("when getById is called", () => {
    test("then if all is OK it return the info", async () => {
      const mockId = { id: "test" };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockId),
      });

      const info = await repo.getById("test");
      expect(info).toEqual(mockId);
    });
    test("then if fetch resp is NO OK it throws error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Test error");
      const info = repo.getById("test");
      await expect(info).rejects.toThrow();
    });
  });

  describe("when we call the getByTheme function", () => {
    test("then fetch is OK it should return data", async () => {
      const mockValue = { theme: "test" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.getByTheme("test");
      expect(result).toEqual(mockValue);
    });
    test("then if fetch is NOT OK it throw", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.getByTheme("test");
      await expect(result).rejects.toThrow();
    });
  });
});
