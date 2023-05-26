import { GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';

type CommonSearch = {
  page?: number;
  size?: number;
  [key: string]: any;
};

const useSearch = (search?: CommonSearch) => {
  const [dataSearch, setDataSearch] = useState<CommonSearch>({
    page: 1,
    size: 10,
    ...search,
  });

  const onSearchChange = useCallback((search?: CommonSearch) => {
    setDataSearch((current) => ({
      ...current,
      page: 1,
      ...search,
    }));
  }, []);

  const onPaginationChange = useCallback((models: GridPaginationModel) => {
    setDataSearch((current) => ({
      ...current,
      page: models.page + 1,
      size: models.pageSize,
    }));
  }, []);

  return { dataSearch, onSearchChange, onPaginationChange };
};

export default useSearch;
