/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { Provider } from "react-redux";
import { useUsers } from "../../hooks/use-users";
import { UsersRepo } from "../../services/user-repo";
import { store } from "../../store/store";
import { LogIn } from "./login";

const mockPasswd = "pass test";

jest.mock("../../hooks/use-users");
