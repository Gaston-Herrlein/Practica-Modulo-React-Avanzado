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
  ADVERT_DELETED_PENDING,
  ADVERT_DELETED_FULFILLED,
  ADVERT_DELETED_REJECTED,
  UI_RESET_ERROR,
} from "./types";
import { areAdvertsLoaded, selectAdvert, areTagsLoaded } from "./selectors";

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
      dispatch(authLogoutPending());
      await auth.logout();
      dispatch(authLogoutFulfilled());
      const to = router.state.location.state?.from || "/login";
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLogoutRejected(error));
    }
  };
};

export const tagsLoadedPending = () => ({ type: TAGS_LOADED_PENDING });
export const tagsLoadedFulfilled = (tags) => ({
  type: TAGS_LOADED_FULFILLED,
  payload: tags,
});
export const tagsLoadedRejected = (error) => ({
  type: TAGS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const loadTags = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areTagsLoaded(state)) {
      return;
    }
    try {
      dispatch(tagsLoadedPending());
      const tags = await services.adverts.getTags();
      dispatch(tagsLoadedFulfilled(tags));
    } catch (error) {
      dispatch(tagsLoadedRejected(error));
    }
  };
};

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

export const loadAdverts = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsLoadedPending());
      const adverts = await services.adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      dispatch(advertsLoadedRejected(error));
    }
  };
};

export const advertsDetailPending = () => ({ type: ADVERTS_DETAIL_PENDING });
export const advertsDetailFulfilled = (advert) => ({
  type: ADVERTS_DETAIL_FULFILLED,
  payload: advert,
});
export const advertsDetailRejected = (error) => ({
  type: ADVERTS_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const advertDetails = (advertId) => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (selectAdvert(advertId)(state)) {
      return;
    }
    try {
      dispatch(advertsDetailPending());
      const advert = await services.adverts.getAdvert(advertId);
      dispatch(advertsDetailFulfilled(advert));
    } catch (error) {
      dispatch(advertsDetailRejected(error));
    }
  };
};

export const advertsCreatedPending = () => ({ type: ADVERTS_CREATED_PENDING });
export const advertsCreatedFulfilled = (advert) => ({
  type: ADVERTS_CREATED_FULFILLED,
  payload: advert,
});
export const advertsCreatedRejected = (error) => ({
  type: ADVERTS_CREATED_REJECTED,
  payload: error,
  error: true,
});

export const createAdvert = (advert) => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(advertsCreatedPending());
      const { id } = await services.adverts.createAdvert(advert);
      const createdAdvert = await services.adverts.getAdvert(id);
      dispatch(advertsCreatedFulfilled(createdAdvert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(advertsCreatedRejected(error));
    }
  };
};

export const advertDeletedPending = () => ({ type: ADVERT_DELETED_PENDING });
export const advertDeletedFulfilled = () => ({
  type: ADVERT_DELETED_FULFILLED,
});
export const advertDeletedRejected = (error) => ({
  type: ADVERT_DELETED_REJECTED,
  payload: error,
  error: true,
});

export const advertDeleted = (advertId) => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (selectAdvert(advertId)(state)) {
      return;
    }
    try {
      dispatch(advertDeletedPending());
      await services.adverts.deleteAdvert(advertId);
      dispatch(advertDeletedFulfilled());
    } catch (error) {
      dispatch(advertDeletedRejected(error));
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
