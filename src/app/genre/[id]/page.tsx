import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';

interface PageProps {
  params: { id: string };
}

function GenrePage({ params: { id } }: PropsWithChildren<PageProps>) {
  if (!id) return notFound();

  return (
    <>
      <h1>Genre Page</h1>
      <h2>id: {id}</h2>
    </>
  );
}

export default GenrePage;
