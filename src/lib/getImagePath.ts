export const getVideoImage = (imagePath?: string, fullSize?: boolean) => {
  const defaultImagePath = './no-image.webp';
  const baseURL = 'https://image.tmdb.org/t/p';
  const imgSize = fullSize ? 'original' : 'w500';
  return imagePath ? `${baseURL}/${imgSize}/${imagePath}` : defaultImagePath;
};
