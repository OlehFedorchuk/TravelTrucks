import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { fetchCars } from "../../redux/carsOps";
import { selectVisibleCars } from "../../redux/selectors";
import {
  selectCarsLoading,
  selectCarsError,
  selectCarsPage,
  selectCarsLimit,
  selectCarsHasMore,
  selectCarsItems,
  selectAppliedFilters,
} from "../../redux/carsSlice";
import css from "./CatalogList.module.css";

const AUTO_MAX_PAGES = 10;

const CatalogList = () => {
  const dispatch = useDispatch();

  const visibleItems = useSelector(selectVisibleCars);
  const rawItems = useSelector(selectCarsItems);
  const appliedFilters = useSelector(selectAppliedFilters);

  const loading = useSelector(selectCarsLoading);
  const error = useSelector(selectCarsError);

  const page = useSelector(selectCarsPage);
  const limit = useSelector(selectCarsLimit);
  const hasMore = useSelector(selectCarsHasMore);
  const lastAutoPageRef = useRef(0);
  const autoCountRef = useRef(0);

  useEffect(() => {
    lastAutoPageRef.current = 0;
    autoCountRef.current = 0;

    dispatch(fetchCars({ page: 1, limit }));
  }, [dispatch, limit, appliedFilters]);

  useEffect(() => {
    if (loading || !hasMore) return;
    if (visibleItems.length > 0) return;
    if (rawItems.length === 0) return;
    if (autoCountRef.current >= AUTO_MAX_PAGES) return;
    if (lastAutoPageRef.current === page) return;

    lastAutoPageRef.current = page;
    autoCountRef.current += 1;

    dispatch(fetchCars({ page: page + 1, limit }));
  }, [
    dispatch,
    visibleItems.length,
    rawItems.length,
    loading,
    hasMore,
    page,
    limit,
  ]);

  const onLoadMore = () => {
    if (loading || !hasMore) return;
    dispatch(fetchCars({ page: page + 1, limit }));
  };

  if (error) {
    return <p className={css.message}>ERROR: {error}</p>;
  }

  const showEmpty =
    visibleItems.length === 0 && rawItems.length > 0 && !loading && !hasMore;

  return (
    <div className={css.wrapper}>
      {showEmpty && (
        <p className={css.message}>Нічого не знайдено за цими фільтрами.</p>
      )}

      <ul className={css.list}>
        {visibleItems.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={css.loadMore}
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CatalogList;
