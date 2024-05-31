'use client';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { MovieSearchResult } from '@/lib/types';
import { getVideoImage } from '@/lib/getImagePath';
import { Button } from '../ui/button';

import styles from '../HeroCarousel/HeroCarousel.module.css';

interface HeroCarouselProps {
  movies: ReadonlyArray<MovieSearchResult>;
}

Autoplay.globalOptions = {
  delay: 5000,
  stopOnUserInteraction: true,
};

export const HeroCarousel: FC<HeroCarouselProps> = ({ movies }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [Autoplay()]);
  const carouselStyles = cn(
    'relative mb-10 overflow-hidden hover:cursor-grab active:cursor-grabbing',
    styles.heroCarousel,
  );

  return (
    <div className={carouselStyles} ref={emblaRef}>
      <div className="flex">
        {movies.map((movie) => {
          const imgPath = movie.backdrop_path || movie.poster_path;
          const movieImg = getVideoImage(imgPath, true);
          const { id, title, overview } = movie;
          return (
            <div key={id} className="relative h-[400px] min-w-0 flex-full md:h-[600px]">
              <Image
                alt={`${title} backdrop`}
                src={movieImg}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />

              <div className="absolute left-0 top-0 z-20 mt-0 hidden h-full w-full space-y-5 bg-transparent bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 pt-40 text-white lg:inline xl:pt-52">
                <h2 className="z-50 max-w-xl text-5xl font-bold">{title}</h2>
                <p className="line-clamp-3 max-w-xl">{overview}</p>
                <Button asChild>
                  <Link href={`/movie/${id}`}>More Details</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
