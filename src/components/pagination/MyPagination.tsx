import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'dgz-ui/pagination';
import { cn } from 'dgz-ui/utils';
import { useTranslation } from 'react-i18next';
import { type Option, ReactSelect } from 'dgz-ui/form';
import { useCallback, useMemo } from 'react';

interface MyPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

/**
 * MyPagination renders a pagination control with page links and a "go to page" selector.
 *
 * @param props.currentPage - Current page number.
 * @param props.totalPages - Total number of pages.
 * @param props.onPageChange - Callback to change page.
 */
export const MyPagination = ({
  currentPage = 1,
  totalPages = 0,
  onPageChange,
}: MyPaginationProps) => {
  const { t } = useTranslation();

  const getPaginationItems = useCallback(() => {
    const pages: (string | number)[] = [];
    const visibleRange = 1;

    pages.push(1);

    if (currentPage - visibleRange > 2) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, currentPage - visibleRange);
      i <= Math.min(totalPages - 1, currentPage + visibleRange);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + visibleRange < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const pageOptions = useMemo(() => {
    const options: Option[] = [];
    for (let i = 0; i < totalPages; i++) {
      options.push({
        value: `${i + 1}`,
        label: `${i + 1}`,
      });
    }
    return options;
  }, [totalPages]);

  return (
    <div className={'flex flex-col items-center justify-end gap-3 lg:flex-row'}>
      <div className={'flex items-center gap-3 text-sm'}>
        <div className={'min-w-20 font-semibold'}>{t('Go to page')}:</div>
        <ReactSelect
          className={'min-w-20'}
          isClearable={false}
          options={pageOptions}
          value={`${currentPage}`}
          onChange={(page) => onPageChange(parseInt(page as string))}
        />
      </div>
      <Pagination className={'justify-end'}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={currentPage > 1}
              size="sm"
              className={cn(currentPage > 1 ? 'disabled' : 'shadow')}
              onClick={() => {
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
            />
          </PaginationItem>
          {getPaginationItems().map((page, index) => (
            <PaginationItem
              key={index}
              onClick={() => {
                if (typeof page === 'number') {
                  onPageChange(page);
                }
              }}
            >
              <PaginationLink
                size={'sm'}
                className={cn(
                  'w-9 px-0 text-center',
                  page === currentPage && 'shadow'
                )}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              size="sm"
              onClick={() => {
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={cn(currentPage < totalPages ? 'disabled' : 'shadow')}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
