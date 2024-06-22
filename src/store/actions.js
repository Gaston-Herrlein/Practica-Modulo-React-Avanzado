import {
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  AUTH_LOGOUT_PENDING,
  AUTH_LOGOUT_FULFILLED,
  AUTH_LOGOUT_REJECTED,
  TAGS_LOADED_PENDING,
  TAGS_LOADED_FULFILLED,
  TAGS_LOADED_REJECTED,
  ADVERTS_LOADED_PENDING,
  ADVERTS_LOADED_FULFILLED,
  ADVERTS_LOADED_REJECTED,
  ADVERTS_DETAIL_PENDING,
  ADVERTS_DETAIL_FULFILLED,
  ADVERTS_DETAIL_REJECTED,
  ADVERTS_CREATED_PENDING,
  ADVERTS_CREATED_FULFILLED,
  ADVERTS_CREATED_REJECTED,
  ADVERTS_DELETED_PENDING,
  ADVERTS_DELETED_FULFILLED,
  ADVERTS_DELETED_REJECTED,
  UI_RESET_ERROR,
} from "./types";

import { areAdvertsLoaded, selectAdvert } from "./selectors";

export const authLoginPending = () => ({ type: AUTH_LOGIN_PENDING });

export const authLoginFulfilled = (accessToken) => ({
  type: AUTH_LOGIN_FULFILLED,
  payload: accessToken,
});

export const authLoginRejected = (error) => ({
  type: AUTH_LOGIN_REJECTED,
  payload: error,
  error: true,
});

export const authLogin = (credentials) => {
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLoginPending());
      const accessToken = await auth.login(credentials);
      dispatch(authLoginFulfilled(accessToken));
      const to = router.state.location.state?.from || "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginRejected(error));
    }
  };
};

export const authLogoutPending = () => ({ type: AUTH_LOGOUT_PENDING });

export const authLogoutFulfilled = () => ({ type: AUTH_LOGOUT_FULFILLED });

export const authLogoutRejected = (error) => ({
  type: AUTH_LOGOUT_REJECTED,
  payload: error,
  error: true,
});

export const logout = () => {
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLogoutPending);
      await auth.logout();
      dispatch(authLogoutFulfilled);
    } catch (error) {
      dispatch(authLogoutRejected(error));
    }
  };
};

export const tagsLoadedPending = () => ({ type: TAGS_LOADED_PENDING });
export const tagsLoadedFulfilled = () => ({ type: TAGS_LOADED_FULFILLED });
export const tagsLoadedRejected = (error) => ({
  type: TAGS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const advertsLoadedPending = () => ({ type: ADVERTS_LOADED_PENDING });

export const advertsLoadedFulfilled = (adverts) => ({
  type: ADVERTS_LOADED_FULFILLED,
  payload: adverts,
});

export const advertsLoadedRejected = (error) => ({
  type: ADVERTS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const loadTweets = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsLoadedPending());
      const adverts = await services.adverts.getLatestTweets();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      dispatch(advertsLoadedRejected(error));
    }
  };
};

export const advertsDetailPending = () => ({ type: ADVERTS_DETAIL_PENDING });

export const advertsDetailFulfilled = (tweet) => ({
  type: ADVERTS_DETAIL_FULFILLED,
  payload: tweet,
});

export const advertsDetailRejected = (error) => ({
  type: ADVERTS_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const loadTweet = (tweetId) => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (selectAdvert(tweetId)(state)) {
      return;
    }

    try {
      dispatch(advertsDetailPending());
      const tweet = await services.adverts.getTweet(tweetId);
      dispatch(advertsDetailFulfilled(tweet));
    } catch (error) {
      dispatch(advertsDetailRejected(error));
    }
  };
};

export const advertsCreatedPending = () => ({ type: ADVERTS_CREATED_PENDING });

export const advertsCreatedFulfilled = (tweet) => ({
  type: ADVERTS_CREATED_FULFILLED,
  payload: tweet,
});

export const advertsCreatedRejected = (error) => ({
  type: ADVERTS_CREATED_REJECTED,
  payload: error,
  error: true,
});

export const createTweet = (tweet) => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(advertsCreatedPending());
      const { id } = await services.adverts.createTweet(tweet);
      const createdTweet = await services.adverts.getTweet(id);
      dispatch(advertsCreatedFulfilled(createdTweet));
      router.navigate(`/adverts/${createdTweet.id}`);
      return createdTweet;
    } catch (error) {
      dispatch(advertsCreatedRejected(error));
    }
  };
};

export const advertsDeletedPending = () => ({ type: ADVERTS_DELETED_PENDING });

export const advertsDeletedFulfilled = () => ({
  type: ADVERTS_DELETED_FULFILLED,
});

export const advertsDeletedRejected = (error) => ({
  type: ADVERTS_DELETED_REJECTED,
  payload: error,
  error: true,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
