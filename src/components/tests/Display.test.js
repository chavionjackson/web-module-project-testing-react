import React from "react";
import { screen, render, waitFor, queryByTestId } from "@testing-library/react";
import Display from "../Display";
import userEvent from "@testing-library/user-event";

const testDisplay = {
  name: "Chevy's Show!",
  seasons: [
    { id: 0, name: "Season 1", episodes: [] },
    { id: 1, name: "Season 2", episodes: [] },
    { id: 2, name: "Season 3", episodes: [] },
    { id: 3, name: "Season 4", episodes: [] },
    { id: 4, name: "Season 5", episodes: [] },
    { id: 5, name: "Season 6", episodes: [] },
  ],
  summary: "Greatest show on the planet",
};

test("the Display component renders without any passed in props", () => {
  render(<Display />);
});

test("Test that when the fetch button is pressed, the show component will display", async () => {
  render(<Display display={testDisplay} />);
  const button = screen.queryByRole("button");

  userEvent.click(button);

  waitFor(() => {
    const show = queryByTestId("show-container");
    expect(show).toBeInTheDocument();
  });
});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  render(<Display show={testDisplay} />);
  const button = screen.getByRole("button");

  userEvent.click(button);

  waitFor(() =>
    expect(screen.getAllByTestId("season-option")).toHaveLength(
      testDisplay.seasons.length
    )
  );
});

test("test if optional function is being called", () => {
  const mockClick = jest.fn();
  render(<Display handleClick={mockClick} />);
  const button = screen.getByRole("button");

  userEvent.click(button);

  waitFor(() => expect(mockClick).toHaveBeenCalledTimes(1));
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
