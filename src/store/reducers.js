import {
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGOUT_FULFILLED,
  ADVERTS_LOADED_FULFILLED,
  ADVERTS_CREATED_FULFILLED,
  ADVERTS_DETAIL_FULFILLED,
  TAGS_LOADED_FULFILLED,
  UI_RESET_ERROR,
} from "./types";

export const initialState = {
  auth: {
    isAuth: false,
    jwt: "",
  },
  adverts: {
    loaded: false,
    data: [],
  },
  tags: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_FULFILLED:
      return { ...state, isAuth: true, jwt: action.payload };
    case AUTH_LOGOUT_FULFILLED:
      return { ...initialState.auth };
    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    case ADVERTS_CREATED_FULFILLED:
      return { ...state, data: [action.payload, ...state.data] };
    case ADVERTS_DETAIL_FULFILLED:
      return { ...state, data: [action.payload] };
    default:
      return state;
  }
}

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }

  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type.endsWith("/pending")) {
    return { ...state, pending: true };
  }

  if (action.type.endsWith("/fulfilled")) {
    return { ...state, pending: false, error: null };
  }

  return state;
}
