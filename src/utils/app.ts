export const getImageUrl = (path: string) => {
  return `${import.meta.env.VITE_APP_S3_URL}/${path}`;
};