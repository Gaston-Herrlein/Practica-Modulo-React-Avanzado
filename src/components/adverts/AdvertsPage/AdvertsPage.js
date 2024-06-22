import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { areAdvertsLoaded, selectAdverts } from "../../../store/selectors";
import { loadAdverts } from "../../../store/actions";

import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
import { defaultFilters, filterAdverts } from "./filters";

const getFilters = () => storage.get("filters") || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage() {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);
  const isLoading = useSelector(areAdvertsLoaded);

  const [filters, setFilters] = useState(getFilters);

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  const filteredAdverts = filterAdverts(adverts, filters);

  if (!isLoading) {
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
