import { v4 } from "uuid";
import {
  DailyReportSpecialOccurrencesQuery_result,
  DailyReportSpecialOccurrencesQuery_result_items,
} from "./api/getSpecialOccurrences";

export const generateOccurrence = (
  projectId: string,
  date: string
): DailyReportSpecialOccurrencesQuery_result_items => ({
  __typename: "SpecialOccurrence",
  id: v4(),
  description: "",
  date: date,
  projectId,
});

export const recalculateSummary = (
  total: DailyReportSpecialOccurrencesQuery_result["total"],
  count: number,
  delta: number
) => ({
  count,
  total: total ? total + delta : total,
});

export const recalculateCounts = () => {};
