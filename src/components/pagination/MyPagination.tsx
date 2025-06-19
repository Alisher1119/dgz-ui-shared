import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "dgz-ui/pagination";
import { cn } from "dgz-ui";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "dgz-ui/form";
import { useCallback } from "react";

interface MyPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const MyPagination = ({
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
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - visibleRange);
      i <= Math.min(totalPages - 1, currentPage + visibleRange);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + visibleRange < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={"flex flex-col lg:flex-row items-center justify-end gap-3"}>
      <div className={"flex gap-3 text-sm items-center"}>
        <div className={"font-semibold min-w-20"}>{t("Go to page")}:</div>
        <Select
          onValueChange={(page) => onPageChange(parseInt(page))}
          defaultValue={`1`}
        >
          <SelectTrigger className="w-14 h-8.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {new Array(totalPages).fill(0).map((_page, index) => (
              <SelectItem key={index + 1} value={`${index + 1}`}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Pagination className={"justify-end"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={currentPage > 1}
              size="sm"
              className={cn(currentPage === 1 ? "disabled" : "shadow")}
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>
          {getPaginationItems().map((page, index) => (
            <PaginationItem
              key={index}
              onClick={() => {
                if (typeof page === "number") {
                  onPageChange(page);
                }
              }}
            >
              <PaginationLink
                size={"sm"}
                className={cn(
                  "w-9 text-center px-0",
                  page === currentPage && "shadow",
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
              onClick={() => onPageChange(currentPage + 1)}
              className={cn(currentPage === totalPages ? "disabled" : "shadow")}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyPagination;
