/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { ProfileCard } from "./profile-card";

const mockReserve = {
  name: "name test",
  escaperoom: {
    name: "name test",
  },
};

describe("Given the card component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ProfileCard reserves={mockReserve}></ProfileCard>
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
