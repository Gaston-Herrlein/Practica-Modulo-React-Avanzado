import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { areAdvertsLoaded } from "../../../store/selectors";

import NewAdvertForm from "./NewAdvertForm";
import { createAdvert } from "../../../store/actions";

function NewAdvertPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(areAdvertsLoaded);

  const handleSubmit = async (newAdvert) => {
    dispatch(createAdvert(newAdvert));
  };

  return <NewAdvertForm onSubmit={handleSubmit} isLoading={isLoading} />;
}

export default NewAdvertPage;
