import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DailyReportPage from "./DailyReportPage";
import { v4 } from "uuid";
import * as hooks from "../hooks/useManageOccurrencies";
import { occurrenciesList } from "../testHelpers";

const projectId = v4();
const date = "2020-10-10";

describe("<DailyReportPage />", () => {
  it("should render correctly when empty", () => {
    jest.spyOn(hooks, "useManageOccurrencies").mockImplementation(
      () =>
        ({
          data: [],
          create: () => {},
          update: () => {},
          remove: () => {},
          deferredUpdate: () => {},
        } as any)
    );

    const { getByTestId, getByText } = render(
      <DailyReportPage projectId={projectId} date={date} />
    );

    expect(getByTestId("add-occurrence-btn")).toBeInTheDocument();
    expect(getByText(/no data yet/i)).toBeInTheDocument();
  });

  it("should render correctly with data", async () => {
    jest.spyOn(hooks, "useManageOccurrencies").mockImplementation(
      () =>
        ({
          data: occurrenciesList,
          create: () => {},
          update: () => {},
          remove: () => {},
          deferredUpdate: () => {},
        } as any)
    );

    const { queryAllByTestId } = render(
      <DailyReportPage projectId={projectId} date={date} />
    );

    expect(queryAllByTestId(/occurrence-item$/i)).toHaveLength(
      occurrenciesList.length
    );
  });

  it("should call `create` when `Add` button pressed", async () => {
    const mockCreate = jest.fn();

    jest.spyOn(hooks, "useManageOccurrencies").mockImplementation(
      () =>
        ({
          data: [],
          create: mockCreate,
          update: () => {},
          remove: () => {},
          deferredUpdate: () => {},
        } as any)
    );

    const { getByTestId } = render(
      <DailyReportPage projectId={projectId} date={date} />
    );

    fireEvent.click(getByTestId("add-occurrence-btn"));

    expect(mockCreate).toBeCalled();
  });

  it("should call `update` when text changes", async () => {
    const id = occurrenciesList[0].id;
    const newDescription = "New text";
    const mockUpdate = jest.fn();

    jest.spyOn(hooks, "useManageOccurrencies").mockImplementation(
      () =>
        ({
          data: occurrenciesList,
          create: () => {},
          update: () => {},
          remove: () => {},
          deferredUpdate: mockUpdate,
        } as any)
    );

    const { getByTestId } = render(
      <DailyReportPage projectId={projectId} date={date} />
    );

    fireEvent.change(
      getByTestId(`${id}-occurrence-item`).querySelector(
        "textarea:first-child"
      )!,
      {
        target: { value: newDescription },
      }
    );

    expect(mockUpdate).toBeCalledWith(id, newDescription);
  });

  it("should call `remove` when remove button pressed", async () => {
    const id = occurrenciesList[0].id;
    const mockRemove = jest.fn();

    jest.spyOn(hooks, "useManageOccurrencies").mockImplementation(
      () =>
        ({
          data: occurrenciesList,
          create: () => {},
          update: () => {},
          remove: mockRemove,
          deferredUpdate: () => {},
        } as any)
    );

    const { getByTestId } = render(
      <DailyReportPage projectId={projectId} date={date} />
    );

    fireEvent.click(getByTestId(`${id}-occurrence-item__remove-btn`));

    expect(mockRemove).toBeCalled();
  });
});
