'use client';

import { useState } from 'react';

import { useSuspenseGetAllOutages } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import GetTechnicianOutage from '@/components/modules/outage/GetTechnicianOutage';

const TechnicianOutages = () => {
  const [searchInput, setSearchInput] = useState('');
      const [page, setPage] = useState(1);
  
      const search = useDebounce(searchInput, 500);
  
      const params = {
          search,
          page,
          limit: 5,
      };
  
      const { data } = useSuspenseGetAllOutages(params);
  
      const outages = data?.data?.data ?? [];
  
      const totalPages = data?.data?.meta?.totalPage ?? 0;
  
      const handleSearch = (value: string) => {
          setSearchInput(value);
          setPage(1);
      };
  
  return (
    <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Outages:</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by title, area or code..."
                    />
                </div>

               
            </div>

            <div>
                <GetTechnicianOutage data={outages} />
            </div>

            <div className="my-5">
                <TablePagination
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={setPage}
                />
            </div>
        </div>
  )
}

export default TechnicianOutages
