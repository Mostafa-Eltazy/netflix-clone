import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard"
import useMovieList from '../hooks/useMovieList';
import MovieList from "../components/MovieList";
import useFavorites from '../hooks/useFavorites';
import InfoModal from "../components/InfoModal";
import useInfoModal from "../hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {
  const { data: user } = useCurrentUser();
  const {data: trendingMovies = []} = useMovieList();
  const { data: favoriteMovies = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal();
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={trendingMovies} />
        <MovieList title="My List" data={favoriteMovies} />

      </div>
    </>
  );
}
