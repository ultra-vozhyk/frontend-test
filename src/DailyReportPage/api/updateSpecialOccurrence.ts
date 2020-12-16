import { gql } from "@apollo/client";

export const updateSpecialOccurrence = gql`
  mutation DailyReportUpdateSpecialOccurrenceMutation(
    $input: UpdateSpecialOccurrenceInput!
  ) {
    updateSpecialOccurrence(input: $input) {
      id
      description
    }
  }
`;

export interface DailyReportUpdateSpecialOccurrenceMutation_updateSpecialOccurrence {
  __typename: "SpecialOccurrence";
  id: string;
}

export interface DailyReportUpdateSpecialOccurrenceMutation {
  updateSpecialOccurrence: DailyReportUpdateSpecialOccurrenceMutation_updateSpecialOccurrence;
}

export interface UpdateSpecialOccurrenceInput {
  id: string;
  description?: string | null;
}

export interface DailyReportUpdateSpecialOccurrenceMutationVariables {
  input: UpdateSpecialOccurrenceInput;
}
