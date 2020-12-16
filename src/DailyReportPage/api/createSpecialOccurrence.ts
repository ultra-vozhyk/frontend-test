import { gql } from "@apollo/client";

export const createSpecialOccurrenceMutation = gql`
  mutation DailyReportCreateSpecialOccurrenceMutation(
    $input: CreateSpecialOccurrenceInput!
  ) {
    createSpecialOccurrence(input: $input) {
      id
      description
    }
  }
`;

export interface CreateSpecialOccurrenceInput {
  projectId: string;
  date: string;
  id: string;
  description?: string | null;
}

export interface DailyReportCreateSpecialOccurrenceMutation_createSpecialOccurrence {
  __typename: "SpecialOccurrence";
  id: string;
}

export interface DailyReportCreateSpecialOccurrenceMutation {
  createSpecialOccurrence: DailyReportCreateSpecialOccurrenceMutation_createSpecialOccurrence;
}

export interface DailyReportCreateSpecialOccurrenceMutationVariables {
  input: CreateSpecialOccurrenceInput;
}
