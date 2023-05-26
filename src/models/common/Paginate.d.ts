type PaginateParams = {
  page?: number;
  size?: number;
};

type PaginateResponse<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
};
