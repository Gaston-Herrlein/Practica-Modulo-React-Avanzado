import React from "react";
import { useNavigate } from "react-router-dom";

import { createAdvert } from "../service";
import NewAdvertForm from "./NewAdvertForm";
import navigateAfterRequestError from "../../../utils/navigateAfterRequestError";

function NewAdvertPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (newAdvert) => {
    setIsLoading(true);
    try {
      const createdAdvert = await createAdvert(newAdvert);
      setIsLoading(false);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      setIsLoading(false);
      navigateAfterRequestError(error, navigate);
    }
  };

  return <NewAdvertForm onSubmit={handleSubmit} isLoading={isLoading} />;
}

export default NewAdvertPage;
