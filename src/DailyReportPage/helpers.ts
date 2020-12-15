import { v4 } from "uuid";
import {
  DailyReportSpecialOccurrencesQuery_result,
  DailyReportSpecialOccurrencesQuery_result_items,
  OrderDirection,
} from "./api/getSpecialOccurrences";

export const generateOccurrence = (
  projectId: string
): DailyReportSpecialOccurrencesQuery_result_items => ({
  __typename: "SpecialOccurrence",
  id: v4(),
  description: "",
  date: new Date().toISOString().slice(0, 10),
  projectId,
});

export const mergeWithOrder = <T>(
  source: T[],
  incoming: T[],
  order: OrderDirection
) => {
  return order.toLowerCase() === OrderDirection.asc
    ? [...source, ...incoming]
    : [...incoming, ...source];
};

export const updateOccurenciesData = (
  prevQueryRes: DailyReportSpecialOccurrencesQuery_result,
  incomingOccurrencies: DailyReportSpecialOccurrencesQuery_result_items[],
  sortOrder: OrderDirection
) => {
  const { items, total, ...rest } = prevQueryRes;
  const nextItems = mergeWithOrder(items, incomingOccurrencies, sortOrder);

  return {
    ...rest,
    items: nextItems,
    count: nextItems.length,
    total: total ? total + 1 : null,
  };
};
