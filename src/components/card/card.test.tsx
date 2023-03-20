/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";

import { EscapeRoomStructure } from "../../model/escaperoom";
import { store } from "../../store/store";
import { Card } from "./card";

const mockRoom = {
  id: "idTest",
  name: "name test",
} as unknown as EscapeRoomStructure;

describe("Given the card component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Card room={mockRoom}></Card>
          </Router>
        </Provider>
      );
    });
  });

  describe("when the CARD component is rendered", () => {
    test("then it should contain the list role", () => {
      const elements = screen.getAllByRole("listitem");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
