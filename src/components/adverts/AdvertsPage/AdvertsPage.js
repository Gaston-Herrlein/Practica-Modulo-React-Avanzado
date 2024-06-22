import { useEffect, useState } from "react";

import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
import { getAdverts } from "../service";
import { defaultFilters, filterAdverts } from "./filters";
import { useNavigate } from "react-router-dom";
import navigateAfterRequestError from "../../../utils/navigateAfterRequestError";

const getFilters = () => storage.get("filters") || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage() {
  const navigate = useNavigate();
  const [adverts, setAdverts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(getFilters);

  useEffect(() => {
    setIsLoading(true);
    getAdverts()
      .then((adverts) => {
        setIsLoading(false);
        setAdverts(adverts);
      })
      .catch((error) => {
        setIsLoading(false);
        navigateAfterRequestError(error, navigate);
      });
  }, [navigate]);

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  const filteredAdverts = filterAdverts(adverts, filters);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </>
  );
}

export default AdvertsPage;
