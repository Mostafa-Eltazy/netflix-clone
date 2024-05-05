import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useFavorites = () => {
  const { data, error, isLoadding, mutate } = useSWR(
    "/api/favorites",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );
  return {
    data,
    error,
    isLoadding,
    mutate,
  };
};

export default useFavorites;