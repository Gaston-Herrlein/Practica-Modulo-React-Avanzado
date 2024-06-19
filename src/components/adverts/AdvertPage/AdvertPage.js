import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../service';
import navigateAfterRequestError from '../../../utils/navigateAfterRequestError';

function AdvertPage() {
  const { advertId } = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAdvert(advertId)
      .then(advert => {
        setAdvert(advert);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        navigateAfterRequestError(error, navigate);
      });
  }, [advertId, navigate]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteAdvert(advertId);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      navigateAfterRequestError(error, navigate);
    }
  };

  if (isLoading) {
    return 'Loading...';
  }

  return (
    advert && (
      <AdvertDetail onDelete={handleDelete} isLoading={isLoading} {...advert} />
    )
  );
}

export default AdvertPage;
