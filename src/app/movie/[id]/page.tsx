import type { FC } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getMovieById } from '@/lib/api/getMovies';
import { getVideoImage } from '@/lib/getImagePath';
import { StarIcon } from 'lucide-react';

interface PageProps {
  params: { id: string };
}

const MoviePage: FC<PageProps> = async ({ params }) => {
  const { id } = params;
  if (!id) return notFound();

  const movie = await getMovieById(id);

  const { title, tagline, overview, release_date, poster_path, backdrop_path } = movie;
  const heroImg = getVideoImage(backdrop_path || poster_path, true);

  return (
    <>
      <div className="relative mb-20 h-[400px] w-full overflow-hidden md:h-[600px]">
        <Image
          alt={title}
          src={heroImg}
          quality={80}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.85 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]" />
      </div>

      <div className="container mb-20 flex max-w-3xl flex-col gap-6">
        <div className="flex space-x-4">
          <p className="text-sm text-gray-400">
            <span className="flex items-center gap-x-1">
              Avg Rating: <StarIcon style={{ fill: 'gold' }} stroke="gold" size={10} />{' '}
              {movie.vote_average.toFixed(1)}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            <span className="flex items-center gap-x-1">Release Date: {release_date}</span>
          </p>
        </div>
        <div>
          <h1 className="mb-8 text-4xl font-bold">{title}</h1>
          <h2 className="font-semi mb-4 text-xl font-medium italic text-gray-400">{tagline}</h2>
          <p className="leading-6 text-gray-400">{overview}</p>
        </div>
        <div className="flex gap-2">
          {movie.genres.map((genre) => (
            <Badge variant={'secondary'} key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
