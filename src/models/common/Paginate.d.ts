type PaginateParams = {
  page?: number;
  size?: number;
};

type PaginateResponse<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
};
