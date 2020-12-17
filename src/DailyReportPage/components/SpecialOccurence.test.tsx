import { fireEvent, render } from "@testing-library/react";
import React from "react";
import SpecialOccurence from "./SpecialOccurence";

const id = "tmp";
const testText = "Test text";

describe("<SpecialOccurrence />", () => {
  it("should render correctly", () => {
    const { getByDisplayValue, getByTestId } = render(
      <SpecialOccurence
        id={id}
        text={testText}
        onEdit={() => {}}
        onRemove={() => {}}
      />
    );

    expect(getByDisplayValue(testText)).toBeInTheDocument();
    expect(getByTestId(`${id}-occurrence-item__remove-btn`)).not.toBeVisible();
  });

  it("should invoke `onEdit` callback, when text changes", () => {
    const newText = "new text";
    const handleEdit = jest.fn();
    const { getByDisplayValue } = render(
      <SpecialOccurence
        id={id}
        text={testText}
        onEdit={handleEdit}
        onRemove={() => {}}
      />
    );

    fireEvent.change(getByDisplayValue(testText), {
      target: { value: newText },
    });

    expect(handleEdit).toBeCalledWith(id, newText);
  });

  it("should invoke `onRemove` callback, when remove button clicked", () => {
    const handleRemove = jest.fn();
    const { getByTestId } = render(
      <SpecialOccurence
        id="tmp"
        text={testText}
        onEdit={() => {}}
        onRemove={handleRemove}
      />
    );

    fireEvent.click(getByTestId(`${id}-occurrence-item__remove-btn`));

    expect(handleRemove).toBeCalledWith(id);
  });
});
