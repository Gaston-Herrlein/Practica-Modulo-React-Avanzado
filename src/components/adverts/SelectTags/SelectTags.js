import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectTags } from "../../../store/selectors";
import { loadTags } from "../../../store/actions";

import { CheckboxGroup } from "../../common";

function SelectTags(props) {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);

  useEffect(() => {
    dispatch(loadTags());
  }, [dispatch]);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
