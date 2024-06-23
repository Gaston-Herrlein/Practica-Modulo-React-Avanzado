import {
  advertsLoadedFulfilled,
  // authLogin,
  // authLoginFulfilled,
  // authLoginRejected,
  authLoginPending,
} from "../actions";
import { AUTH_LOGIN_PENDING, ADVERTS_LOADED_FULFILLED } from "../types";

describe("authLoginPending", () => {
  test('should return an "AUTH_LOGIN_PENDING" action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_PENDING,
    };
    const action = authLoginPending();
    expect(action).toEqual(expectedAction);
  });
});

describe("advertsLoadedFulfilled", () => {
  test('should return an "ADVERTS_LOADED_FULFILLED" action', () => {
    const adverts = "adverts";
    const expectedAction = {
      type: ADVERTS_LOADED_FULFILLED,
      payload: adverts,
    };
    const action = advertsLoadedFulfilled(adverts);
    expect(action).toEqual(expectedAction);
  });
});
