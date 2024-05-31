import { HeroCarousel } from '@/components/HeroCarousel';
import { VideoCarousel } from '@/components/VideoCarousel';
import {
  getDiscoverMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getPopularMovies,
} from '@/lib/api/getMovies';

export default async function Home() {
  const discoverMovies = await getDiscoverMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      <HeroCarousel movies={discoverMovies} />

      <div className="mb-10 flex flex-col space-y-2">
        <VideoCarousel movies={upcomingMovies} title="Upcoming Movies" />
        <VideoCarousel movies={topRatedMovies} title="Top-Rated Movies" />
        <VideoCarousel movies={popularMovies} title="Popular Movies" />
      </div>
    </main>
  );
}
