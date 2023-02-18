export const transformDate = (dateString: string): string => {
  const date = new Date(dateString).toLocaleDateString();
  return date;
};
