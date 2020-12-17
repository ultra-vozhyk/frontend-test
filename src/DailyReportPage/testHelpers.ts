import {
  DailyReportSpecialOccurrencesInput,
  DailyReportSpecialOccurrencesQuery_result_items,
  getSpecialOccurrences,
} from "./api/getSpecialOccurrences";
import {
  CreateSpecialOccurrenceInput,
  createSpecialOccurrenceMutation,
  DailyReportCreateSpecialOccurrenceMutation,
} from "./api/createSpecialOccurrence";
import {
  DailyReportUpdateSpecialOccurrenceMutation,
  updateSpecialOccurrence,
  UpdateSpecialOccurrenceInput,
} from "./api/updateSpecialOccurrence";
import {
  DailyReportDeleteSpecialOccurrenceMutation,
  deleteSpecialOccurrence,
  DeleteSpecialOccurrenceInput,
} from "./api/deleteSpecialOccurrence";
import { MockedResponse } from "@apollo/client/testing";

export const occurrenciesList: DailyReportSpecialOccurrencesQuery_result_items[] = [
  {
    __typename: "SpecialOccurrence",
    id: "41a364d7-7b5f-41dc-83af-1ec8a846ca97",
    description: "Test #1",
    date: "2020-09-10",
  },
  {
    __typename: "SpecialOccurrence",
    id: "0163e645-5eef-4567-9837-56dc045cce4a",
    description: "Test #2",
    date: "2020-07-06",
  },
];

export const getMockedSpecialOccurrencesQuery = (
  input: DailyReportSpecialOccurrencesInput,
  items: DailyReportSpecialOccurrencesQuery_result_items[]
): MockedResponse => ({
  request: {
    query: getSpecialOccurrences,
    variables: {
      input,
    },
  },
  result: {
    data: {
      result: {
        items,
        count: items.length,
        total: null,
        after: null,
      },
    },
  },
});

export const getMockedCreateSpecialOccurenceMutation = (
  input: CreateSpecialOccurrenceInput,
  result: { id: string; description: string }
): MockedResponse<DailyReportCreateSpecialOccurrenceMutation> => ({
  request: {
    query: createSpecialOccurrenceMutation,
    variables: {
      input,
    },
  },
  result: {
    data: {
      createSpecialOccurrence: {
        __typename: "SpecialOccurrence",
        ...result,
      },
    },
  },
});

export const getMockedUpdateSpecialOccurenceMutation = (
  input: UpdateSpecialOccurrenceInput,
  result: { id: string; description: string }
): MockedResponse<DailyReportUpdateSpecialOccurrenceMutation> => ({
  request: {
    query: updateSpecialOccurrence,
    variables: {
      input,
    },
  },
  result: {
    data: {
      updateSpecialOccurrence: {
        __typename: "SpecialOccurrence",
        ...result,
      },
    },
  },
});

export const getMockedRemoveSpecialOccurenceMutation = (
  input: DeleteSpecialOccurrenceInput,
  result: { id: string }
): MockedResponse<DailyReportDeleteSpecialOccurrenceMutation> => ({
  request: {
    query: deleteSpecialOccurrence,
    variables: {
      input,
    },
  },
  result: {
    data: {
      deleteSpecialOccurrence: {
        __typename: "SpecialOccurrence",
        ...result,
      },
    },
  },
});
