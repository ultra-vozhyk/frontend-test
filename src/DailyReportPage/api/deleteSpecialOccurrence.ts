import { gql } from "@apollo/client";

export const deleteSpecialOccurrence = gql`
  mutation DailyReportDeleteSpecialOccurrenceMutation(
    $input: DeleteSpecialOccurrenceInput!
  ) {
    deleteSpecialOccurrence(input: $input) {
      id
    }
  }
`;

export interface DailyReportDeleteSpecialOccurrenceMutation_deleteSpecialOccurrence {
  __typename: "SpecialOccurrence";
  id: string;
}

export interface DailyReportDeleteSpecialOccurrenceMutation {
  deleteSpecialOccurrence: DailyReportDeleteSpecialOccurrenceMutation_deleteSpecialOccurrence;
}

export interface DeleteSpecialOccurrenceInput {
  id: string;
}

export interface DailyReportDeleteSpecialOccurrenceMutationVariables {
  input: DeleteSpecialOccurrenceInput;
}
