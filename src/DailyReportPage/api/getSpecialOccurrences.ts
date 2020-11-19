import { gql } from "@apollo/client";

export const getSpecialOccurrences = gql`
  query DailyReportSpecialOccurrencesQuery($input: DailyReportItemInput!) {
    result: dailyReportSpecialOccurrences(input: $input) {
      items {
        id
        description
        date
      }
      count
      total
      after
    }
  }
`;

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
  asc = "asc",
  desc = "desc",
}

export interface DailyReportItemInput {
  after?: string | null;
  limit?: number | null;
  orderDirection?: OrderDirection | null;
  projectId: string;
  date: string;
}

export interface DailyReportSpecialOccurrencesQuery_result_items {
  __typename: "SpecialOccurrence";
  id: string;
  description: string | null;
  date: string;
}

export interface DailyReportSpecialOccurrencesQuery_result {
  __typename: "DailyReportSpecialOccurrencePage";
  items: DailyReportSpecialOccurrencesQuery_result_items[];
  count: number;
  total: number | null;
  after: string | null;
}

export interface DailyReportSpecialOccurrencesQuery {
  result: DailyReportSpecialOccurrencesQuery_result;
}

export interface DailyReportSpecialOccurrencesQueryVariables {
  input: DailyReportItemInput;
}
