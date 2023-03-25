import { ReservationsRepo } from "./reservation-repo";

const goodFetch = (mock: any) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mock),
  });
};
const badFetch = () => {
  global.fetch = jest.fn().mockResolvedValue("Test error");
};

describe("Given the reservations repo", () => {
  let repo: ReservationsRepo;
  beforeEach(() => {
    repo = new ReservationsRepo();
  });

  describe("when the getAll is called", () => {
    test("then if fetch is ok it should give back the data", async () => {
      const mockValue = { test: 1 };

      goodFetch(mockValue);
      const result = await repo.getAll();
      expect(result).toEqual(mockValue);
    });
    test("the if fetch is NOT OK it throws", async () => {
      badFetch();
      const result = repo.getAll();
      await expect(result).rejects.toThrow();
    });
  });
  describe("when the create function is called", () => {
    const mockValue = {};
    test("then if fetch is OK it should give back the data", async () => {
      goodFetch(mockValue);
      const result = await repo.create(mockValue);
      expect(result).toEqual(mockValue);
    });
    test("the if fetch is NOT OK it throws", async () => {
      badFetch();
      const result = repo.create(mockValue);
      await expect(result).rejects.toThrow();
    });
  });
  describe("when delete function is called", () => {
    test("then if fetch is OK it should give nothing", async () => {
      const mockValue = {};

      goodFetch(mockValue);
      const result = await repo.delete("2");
      expect(result).toEqual({});
    });
    test("the if fetch is NOT OK it throws", async () => {
      badFetch();
      const result = repo.delete("2");
      await expect(result).rejects.toThrow();
    });
  });
  describe("when the getByUser function is called", () => {
    const mockValue = { userId: "123", username: "peter" };
    test("then if fetch is OK it should give nothing", async () => {
      goodFetch(mockValue);
      // eslint-disable-next-line testing-library/no-await-sync-query
      const result = await repo.getByUser();
      expect(result).toEqual(mockValue);
    });
    test("the if fetch is NOT OK it throws", async () => {
      badFetch();
      const result = repo.getByUser();
      await expect(result).rejects.toThrow();
    });
  });
  describe("when the getFilterMonth function is called", () => {
    const mockValue = { userId: "123", username: "peter" };
    test("then if fetch is OK it should give nothing", async () => {
      goodFetch(mockValue);
      const result = await repo.getFilterMonth("2023-4", "12345");
      expect(result).toEqual(mockValue);
    });
    test("the if fetch is NOT OK it throws", async () => {
      badFetch();
      const result = repo.getFilterMonth("2023-4", "12345");
      await expect(result).rejects.toThrow();
    });
  });
});
