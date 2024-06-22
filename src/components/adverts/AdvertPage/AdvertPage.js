import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectAdvert, areAdvertsLoaded } from "../../../store/selectors";
import { advertDetails, advertDeleted } from "../../../store/actions";

import AdvertDetail from "./AdvertDetail";
function AdvertPage() {
  const dispatch = useDispatch();
  const { advertId } = useParams();
  const advert = useSelector(selectAdvert(advertId));
  const isLoading = useSelector(areAdvertsLoaded);

  useEffect(() => {
    dispatch(advertDetails(advertId));
  }, [advertId, dispatch]);

  const handleDelete = async () => {
    dispatch(advertDeleted(advertId));
  };

  if (!isLoading) {
    return "Loading...";
  }
  return (
    advert && (
      <AdvertDetail onDelete={handleDelete} isLoading={isLoading} {...advert} />
    )
  );
}

export default AdvertPage;
