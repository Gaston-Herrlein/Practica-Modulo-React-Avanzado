import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import LoginPage from "../LoginPage";
import { authLogin } from "../../../store/actions";

jest.mock("../../../store/actions");

const userType = (input, text) => userEvent.type(input, text);

describe("LoginPage", () => {
  const state = { ui: { pending: false, error: null } };
  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch authLogin action", () => {
    const email = "email";
    const password = "password";
    const remember = true;

    renderComponent();

    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByPlaceholderText("password");
    const checkboxInput = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button");

    act(() => userType(emailInput, email));
    act(() => userType(passwordInput, password));
    act(() => userType(checkboxInput, remember));

    userEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({
      email,
      password,
      remember,
    });
  });
});
