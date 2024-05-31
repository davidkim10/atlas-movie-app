'use client';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MovieSearchResult } from '@/lib/types';
import { getVideoImage } from '@/lib/getImagePath';
import { cn } from '@/lib/utils';

// @ts-ignore:next-line
import useScrollOnDrag from 'react-scroll-ondrag';

interface VideoCarouselProps {
  title?: string;
  movies: ReadonlyArray<MovieSearchResult>;
}

export const VideoCarousel: FC<VideoCarouselProps> = ({ title, movies = [] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const { events } = useScrollOnDrag(ref);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    setStartPos({ x: clientX, y: clientY });
    events.onMouseDown(e); // Call the scroll on drag's onMouseDown
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = 'changedTouches' in e ? e.changedTouches[0] : e;
    const distance = Math.sqrt(
      Math.pow(clientX - startPos.x, 2) + Math.pow(clientY - startPos.y, 2),
    );
  };

  const handleClick = (movieId: number) => {
    if (!isDragging) {
      router.push(`/movie/${movieId}`);
    }
  };

  return (
    <div>
      {title && <h2 className="px-10 py-2 text-xl font-bold">{title}</h2>}
      <div
        className={cn('flex space-x-4 overflow-scroll px-5 py-5 scrollbar-hide lg:px-10')}
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {movies.map((movie) => {
          const imgPath = movie.backdrop_path || movie.poster_path;
          const movieImg = getVideoImage(imgPath);
          return (
            <div
              className="relative flex-shrink-0 transform cursor-pointer transition duration-200 ease-out hover:scale-105 hover:drop-shadow-lg active:cursor-grabbing"
              key={movie.id}
              onClick={() => handleClick(movie.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#050607]/80">
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs">
                    <span className="flex items-center gap-x-1">
                      <StarIcon style={{ fill: 'gold' }} stroke="gold" size={10} />{' '}
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </p>
                  <h3 className="text-lg">{movie.title}</h3>
                </div>
              </div>
              <Image
                className="h-56 w-fit overflow-hidden rounded-sm object-cover object-center lg:min-w-[400px]"
                width={1920}
                height={1080}
                src={movieImg}
                alt={movie.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
