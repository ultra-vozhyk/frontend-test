import { recalculateSummary } from "./helpers";

describe("helpers.ts", () => {
  describe("`recalculateSummary`", () => {
    it("should return correct result #1", () => {
      const total = 5,
        count = 3,
        delta = -2;

      expect(recalculateSummary(total, count, delta)).toEqual({
        total: 3,
        count: 3,
      });
    });

    it("should return correct result #2", () => {
      const total = 5,
        count = 7,
        delta = 2;

      expect(recalculateSummary(total, count, delta)).toEqual({
        total: 7,
        count: 7,
      });
    });

    it("should return correct result #3", () => {
      const total = null,
        count = 2,
        delta = 50;

      expect(recalculateSummary(total, count, delta)).toEqual({
        total: null,
        count: 2,
      });
    });
  });
});
