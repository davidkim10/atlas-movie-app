import { getVideoImage } from '@/lib/getImagePath';
import { MovieSearchResult } from '@/lib/types';
import Image from 'next/image';

function MovieCard({ movie }: { movie: MovieSearchResult }) {
  return (
    <div className="relative flex-shrink-0 transform cursor-pointer transition duration-200 ease-out hover:scale-105 hover:drop-shadow-lg">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80" />

      <p className="absolute bottom-5 left-5 z-20">{movie.title}</p>
      <Image
        className="h-56 w-fit rounded-sm object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl lg:min-w-[400px]"
        src={getVideoImage(movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
        width={1920}
        height={1080}
        key={movie.id}
      />
    </div>
  );
}

export default MovieCard;
