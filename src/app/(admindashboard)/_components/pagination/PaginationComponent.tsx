"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

type PaginationProps = {
  meta: any;
  query: any;
  setQuery: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

function PaginationComponent({ meta, query, setQuery }: PaginationProps) {
  return (
    <>
      <div>
        {meta && meta.totalPage > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setQuery({
                        ...query,
                        page: Math.max(1, (meta.page as number) - 1),
                        limit: meta.limit,
                      })
                    }
                    className={`rounded-md px-3 py-1 bg-primary text-white hover:bg-primary/90 ${
                      meta.page === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {[...Array(meta.totalPage)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={meta.page === i + 1}
                      onClick={() =>
                        setQuery({
                          ...query,
                          page: i + 1,
                          limit: meta.limit,
                        })
                      }
                      className={`rounded-md px-3 py-1 text-white ${
                        meta.page === i + 1
                          ? "bg-accent hover:bg-accent/90"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setQuery({
                        ...query,
                        page: Math.min(
                          meta.totalPage,
                          (meta.page as number) + 1
                        ),
                        limit: meta.limit,
                      })
                    }
                    className={`rounded-md px-3 py-1 bg-primary text-white hover:bg-primary/90 ${
                      meta.page === meta.totalPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}

export default PaginationComponent;
