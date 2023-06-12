import React, { useCallback, useMemo } from "react";
import { BiPlus, BiCheck } from "react-icons/bi";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

type FavoriteButtonProps = {
  movieId: string;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: user, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const favoriteMovies = user?.favoriteIds || [];
    return favoriteMovies.includes(movieId);
  }, [user, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite/${movieId}`);
    } else {
      response = await axios.post(`/api/favorite/${movieId}`);
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...user,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [isFavorite, movieId, mutate, user, mutateFavorites]);

  const Icon = isFavorite ? BiCheck : BiPlus;

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`
        flex justify-center items-center
        w-6 h-6 lg:w-10 lg:h-10
        group/item transition
        border-white border-2 rounded-full hover:border-neutral-300
        cursor-pointer
        ${isFavorite ? "bg-white" : ""}
      `}
    >
      <Icon
        size={20}
        className={`
          w-4 lg:w-6
          ${
            isFavorite
              ? "text-zinc-900 group-hover/item:text-zinc-600"
              : "text-white group-hover/item:text-neutral-300"
          }
        
        `}
      />
    </button>
  );
};

export default FavoriteButton;
