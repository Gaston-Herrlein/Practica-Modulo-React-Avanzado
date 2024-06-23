import { selectAdvert } from "../selectors";

describe("getAdverts", () => {
  const advertId = 1;
  const adverts = [{ id: advertId }];
  const state = { adverts: { data: adverts } };

  test("should return a advert by advertId", () => {
    expect(selectAdvert(advertId)(state)).toBe(adverts[0]);
  });

  test("should not return any advert", () => {
    expect(selectAdvert("2")(state)).toBeUndefined();
  });
});
