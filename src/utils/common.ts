export const formatNumber = (number?: number) => {
  return Number(number ?? 0).toLocaleString();
};
