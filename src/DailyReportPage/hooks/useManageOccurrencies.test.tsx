import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { OrderDirection } from "../api/getSpecialOccurrences";
import {
  getMockedCreateSpecialOccurenceMutation,
  getMockedRemoveSpecialOccurenceMutation,
  getMockedSpecialOccurrencesQuery,
  getMockedUpdateSpecialOccurenceMutation,
  occurrenciesList,
} from "../testHelpers";
import { useManageOccurrencies } from "./useManageOccurrencies";

const uniqueId = "00000000-0000-0000-0000-000000000000";
const date = "2020-10-05";
const projectId = "26ce49fa-badf-4a89-ab24-683526113975";

jest.mock("uuid", () => ({ v4: () => "00000000-0000-0000-0000-000000000000" }));

const wait = (timeout: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const setupHook = (mocks: MockedResponse[]) => {
  const wrapper: React.FC = ({ children }) => (
    <MockedProvider
      mocks={mocks}
      addTypename={true}
      cache={new InMemoryCache()}
    >
      <>{children}</>
    </MockedProvider>
  );

  return renderHook(
    () => useManageOccurrencies(date, projectId, OrderDirection["desc"]),
    {
      wrapper,
    }
  );
};

describe("`useManageOccurrencies` hook", () => {
  it("should return empty array if query returns empty result", () => {
    const { result } = setupHook([
      getMockedSpecialOccurrencesQuery(
        { date, projectId, orderDirection: OrderDirection["desc"] },
        []
      ),
    ]);

    expect(result.current.data).toHaveLength(0);
  });

  it("should create new occurence without calling the mutation", async () => {
    const { result } = setupHook([
      getMockedSpecialOccurrencesQuery(
        { date, projectId, orderDirection: OrderDirection["desc"] },
        []
      ),
    ]);

    await wait();

    act(() => {
      result.current.create();
    });

    await wait();

    expect(result.current.data).toHaveLength(1);
  });

  it("should call `create` mutation while updating new item", async () => {
    const newDescription = "Some new text";

    const { result } = setupHook([
      getMockedSpecialOccurrencesQuery(
        { date, projectId, orderDirection: OrderDirection["desc"] },
        []
      ),
      getMockedCreateSpecialOccurenceMutation(
        {
          id: uniqueId,
          projectId,
          date,
          description: newDescription,
        },
        {
          id: uniqueId,
          description: newDescription,
        }
      ),
    ]);

    await wait();

    act(() => {
      result.current.create();
    });

    await wait();

    act(() => {
      result.current.update(result.current.data[0].id, newDescription);
    });

    await wait();

    expect(result.current.data[0].description).toEqual(newDescription);
  });

  it("should call `update` mutation on fetched items", async () => {
    const newDescription = "Some new text";
    const { id } = occurrenciesList[0];

    const { result } = setupHook([
      getMockedSpecialOccurrencesQuery(
        { date, projectId, orderDirection: OrderDirection["desc"] },
        occurrenciesList
      ),
      getMockedUpdateSpecialOccurenceMutation(
        {
          id,
          description: newDescription,
        },
        {
          id,
          description: newDescription,
        }
      ),
    ]);

    await wait();

    act(() => {
      result.current.update(id, newDescription);
    });

    await wait();

    const updatedDescription = result.current.data.find((el) => el.id === id);

    expect(updatedDescription?.description).toEqual(newDescription);
  });

  it("should remove local occurence without mutation", async () => {
    const { result } = setupHook([
      getMockedSpecialOccurrencesQuery(
        { date, projectId, orderDirection: OrderDirection["desc"] },
        []
      ),
    ]);

    await wait();

    act(() => {
      result.current.create();
    });

    await wait();

    act(() => {
      result.current.remove(uniqueId);
    });

    await wait();

    expect(result.current.data).toHaveLength(0);
  });

  it("should remove fetched occurence calling mutation", async () => {
    const id = occurrenciesList[0].id;
    const { result } = setupHook([
      getMockedSpecialOccurrencesQuery(
        { date, projectId, orderDirection: OrderDirection["desc"] },
        occurrenciesList
      ),
      getMockedRemoveSpecialOccurenceMutation({ id }, { id }),
    ]);

    await wait();

    act(() => {
      result.current.remove(occurrenciesList[0].id);
    });

    await wait();

    expect(result.current.data).toHaveLength(occurrenciesList.length - 1);
  });
});
