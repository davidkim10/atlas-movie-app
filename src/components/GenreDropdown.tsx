import type { FC } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Genres } from '@/lib/types';

interface GenreDropdownProps {}

export const GenreDropdown: FC<GenreDropdownProps> = async ({}) => {
  const cacheByNoOfDays = (days = 1) => 60 * 60 * 24 * days;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheByNoOfDays(2),
    },
  };

  const req = new Request('https://api.themoviedb.org/3/genre/movie/list?language=en-US', options);
  const res = await fetch(req);
  const data = (await res.json()) as Genres;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="align-center flex space-x-1">
          Genres <ChevronDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data.genres.map(({ id, name }) => {
          const href = `/genre/${id}?genre=${name}`;
          return (
            <DropdownMenuItem key={id}>
              <Link href={href}>{name}</Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
