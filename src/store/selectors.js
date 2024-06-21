export const getIsLogged = (state) => {
  console.log("Auth: ", state.auth);
  console.log("JWT: ", state.auth.jwt);
  console.log("Auth-isAuth: ", state.auth.isAuth);
  return state.auth.isAuth;
};
export const areAdvertsLoaded = (state) => state.adverts.loaded;
export const selectAdverts = (state) => state.adverts.data;
export const areTagsLoaded = (state) => state.tags.loaded;
export const selectTags = (state) => state.tags.data;

export const selectAdvert = (advertsId) => (state) =>
  selectAdverts(state).find((tweet) => tweet.id === Number(advertsId));

export const getUi = (state) => state.ui;
