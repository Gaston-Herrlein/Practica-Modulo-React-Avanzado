import {
  advertsLoadedFulfilled,
  authLogin,
  authLoginFulfilled,
  authLoginRejected,
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

describe("authLogin", () => {
  const credentials = "credentials";
  const action = authLogin(credentials);

  const redirectUrl = "redirectUrl";
  const dispatch = jest.fn();
  const services = { auth: {} };
  const router = {
    state: { location: { state: { from: redirectUrl } } },
    navigate: jest.fn(),
  };

  test("when login resolves should follow the login flow", async () => {
    services.auth.login = jest.fn().mockResolvedValue();

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl, {
      replace: true,
    });
  });

  test("when login rejects should follow the error flow", async () => {
    const error = new Error("unauthorized");
    services.auth.login = jest.fn().mockRejectedValue(error);

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
