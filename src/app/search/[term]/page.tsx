import { NextPage } from "next";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

interface IPageProps {
  params: {
    term: string;
  };
}

function SearchPage({ params: { term } }: PropsWithChildren<IPageProps>) {
  if (!term) return notFound();
  const searchTerm = decodeURI(term);

  return (
    <>
      <h1>Search Page</h1>
      {searchTerm}
    </>
  );
}

export default SearchPage;
