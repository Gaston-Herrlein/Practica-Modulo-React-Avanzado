import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectAdvert, areAdvertsLoaded } from "../../../store/selectors";
import { loadAdvert } from "../../../store/actions";

import AdvertDetail from "./AdvertDetail";
function AdvertPage() {
  const dispatch = useDispatch();
  const { advertId } = useParams();
  const advert = useSelector(selectAdvert(advertId));
  const isLoading = useSelector(areAdvertsLoaded);

  useEffect(() => {
    dispatch(loadAdvert(advertId));
  }, [advertId, dispatch]);

  const handleDelete = async () => {
    // setIsLoading(true);
    // try {
    //   await deleteAdvert(advertId);
    //   setIsLoading(false);
    //   navigate("/");
    // } catch (error) {
    //   setIsLoading(false);
    //   navigateAfterRequestError(error, navigate);
    // }
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
