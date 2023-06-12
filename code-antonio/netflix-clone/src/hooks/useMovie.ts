import useSwr from "swr";

import fetcher from "@/libs/fetcher";

const useMovie = (movieId?: string) => {
  const { data, error, isLoading } = useSwr(
    movieId ? `/api/movies/${movieId}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
};
export default useMovie;
