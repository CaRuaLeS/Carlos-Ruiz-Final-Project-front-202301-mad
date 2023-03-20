import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { List } from "../list/list";
import Home from "./home";

jest.mock("../list/list");

describe("Given the Home component", () => {
  describe("when it renders", () => {
    test("then it renders List component", () => {
      render(
        <Provider store={store}>
          <Home></Home>
        </Provider>
      );
      expect(List).toHaveBeenCalled();
    });
  });
});
