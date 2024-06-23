import { authLoginFulfilled, authLogoutFulfilled } from "../actions";
import { auth, initialState } from "../reducers";

describe("auth", () => {
  test('should manage "AUTH_LOGIN_FULFILLED" action', () => {
    const state = initialState.auth;
    //Se pasa el payload como una cadena vacia
    const action = authLoginFulfilled("");
    const authExpect = { isAuth: true, accessToken: "" };

    expect(auth(state, action)).toEqual(authExpect);
  });

  test('should manage "AUTH_LOGOUT" action', () => {
    const state = initialState.auth;
    const action = authLogoutFulfilled();
    const authExpect = { isAuth: false, accessToken: "" };
    expect(auth(state, action)).toEqual(authExpect);
  });

  test('should manage "ANY" action', () => {
    const state = initialState.auth;
    const action = { type: "ANY" };
    expect(auth(state, action)).toBe(state);
  });

  test('should manage "ANY" action when state is not defined', () => {
    const state = undefined;
    const action = { type: "ANY" };
    expect(auth(state, action)).toBe(initialState.auth);
  });
});
