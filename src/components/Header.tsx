import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggler } from '@/components/theme/ThemeToggler';
import { Search } from './Search';
import { GenreDropdown } from './GenreDropdown';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 z-20 flex w-full items-center justify-between bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900 p-4">
      <div className="mr-5">
        <Link href="/">
          <Image
            src="/logo-s-xs.webp"
            alt="logo"
            width={40}
            height={40}
            draggable={false}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <GenreDropdown />
        <Search />
        <ThemeToggler />
      </div>
    </header>
  );
};
export default Header;
