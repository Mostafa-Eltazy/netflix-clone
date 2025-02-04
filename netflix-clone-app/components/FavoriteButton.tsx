import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "../hooks/useCurrentUser";
import useFavorites from "../hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: muatateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const usermail = currentUser?.email; 
  const currentFavorites = currentUser?.favoriteIds || [];

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.put("/api/favorite", { data: { movieId, usermail, currentFavorites  } });
    } else {
      response = await axios.post("/api/favorite", { data: { movieId, usermail} });
    }

    const updatedFavoriteIds = response.data.favoriteIds;

    mutate({ ...currentUser, favoriteIds: updatedFavoriteIds });

    muatateFavorites();
  }, [movieId, isFavorite, currentUser, muatateFavorites, mutate]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon size={28} className="text-white"/>
    </div>
  );
};

export default FavoriteButton;
