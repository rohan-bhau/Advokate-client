"use client";

import React, { useState } from "react";
import {
  Table,
  Avatar,
  Pagination,
  Button,
  TextField,
  InputGroup,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { LuArrowLeft, LuSearch, LuX } from "react-export-icons";
import { LuArrowLeft, LuSearch, LuX } from "react-icons/lu";

interface LawyerTransactionsClientProps {
  lawyerEmail: string;
  initialData: {
    transactions: any[];
    totalPages: number;
    total: number;
    page: number;
    limit: number;
  };
}

export default function LawyerTransactionsClient({
  lawyerEmail,
  initialData,
}: LawyerTransactionsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state query extraction loops
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Sync dataset metadata dynamically from server initialData parameters
  const transactions = initialData?.transactions || [];
  const totalPages = initialData?.totalPages || 1;
  const totalResults = initialData?.total || 0;
  const limit = initialData?.limit || 10;

  // Global query modifier block route pipeline
  const updateUrlParams = (newPage: number, newSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(1, searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateUrlParams(1, "");
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start">
        <Link href="/dashboard/lawyer">
          <Button
            size="sm"
            variant="secondary"
            className="bg-default-100 hover:bg-default-200 text-default-700 font-semibold rounded-xl text-xs flex items-center gap-2 h-9 px-4"
          >
            <LuArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>
      </div>

      <div className="p-6 bg-content1 rounded-2xl border border-default-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-foreground tracking-tight">
              Earnings & Retainer Records
            </h1>
            <p className="text-xs text-default-400">
              Audit pipeline of incoming client wire transfers and processing
              settlements.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-end gap-2 w-full sm:max-w-xs"
          >
            <TextField className="w-full" name="search">
              <InputGroup>
                <InputGroup.Prefix>
                  <LuSearch className="size-4 text-default-400 shrink-0" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Search client email or stripe code..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full text-xs"
                />
                {searchInput && (
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="focus:outline-none p-0.5 rounded-full hover:bg-default-200"
                    >
                      <LuX className="text-default-400 size-3" />
                    </button>
                  </InputGroup.Suffix>
                )}
              </InputGroup>
            </TextField>
            <Button
              size="sm"
              type="submit"
              className="bg-[#1D44B7] text-white font-bold rounded-xl px-4 text-xs h-9 mb-0.5"
            >
              Search
            </Button>
          </form>
        </div>

        <Table
          aria-label="Lawyer incoming pipeline table"
          className="border-none shadow-none"
        >
          <Table.ScrollContainer>
            <Table.Content className="min-w-[800px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-default-50 text-default-600 font-bold text-xs py-3"
                >
                  Client Account
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Transaction ID
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Status
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Net Revenue
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Date
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {transactions.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      className="text-center text-default-400 py-10"
                      colSpan={5}
                    >
                      No wire payouts recorded yet.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  transactions.map((tx: any) => (
                    <Table.Row
                      key={tx._id}
                      className="border-b border-default-50 hover:bg-default-50/50 transition-all duration-150"
                    >
                      <Table.Cell>
                        <span className="text-xs font-semibold text-foreground select-all">
                          {tx.clientEmail || "Retainer Client"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-[11px] font-mono bg-default-100 text-default-600 px-2.5 py-1 rounded-lg select-all">
                          {tx.stripeSessionId}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                          Settled
                        </span>
                      </Table.Cell>
                      <Table.Cell className="text-xs font-bold text-foreground">
                        ${tx.amountPaid?.toFixed(2)}
                      </Table.Cell>
                      <Table.Cell className="text-xs text-default-500 font-medium">
                        {new Date(tx.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-default-100 overflow-hidden">
          <p className="text-[11px] text-default-400">
            Showing {totalResults === 0 ? 0 : (currentPage - 1) * limit + 1} -{" "}
            {Math.min(currentPage * limit, totalResults)} of {totalResults}{" "}
            payout briefs
          </p>

          {totalPages > 1 && (
            <Pagination className="justify-center">
              <Pagination.Content className="bg-content1 border border-default-200 rounded-xl shadow-sm flex flex-wrap items-center justify-center gap-0 max-w-max mx-auto overflow-hidden">
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={currentPage === 1}
                    onPress={() =>
                      updateUrlParams(currentPage - 1, searchInput)
                    }
                    className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                      currentPage === 1
                        ? "opacity-30 pointer-events-none text-default-300"
                        : "text-foreground hover:bg-default-100 cursor-pointer"
                    }`}
                  >
                    <Pagination.PreviousIcon className="size-4 shrink-0" />
                    <span className="hidden sm:block">Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === currentPage}
                        onPress={() => updateUrlParams(p, searchInput)}
                        className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                          currentPage === p
                            ? "bg-[#1D44B7] text-white rounded-lg shadow-sm hover:bg-[#153491]"
                            : "text-default-500 hover:bg-default-100 rounded-lg"
                        }`}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={currentPage === totalPages}
                    onPress={() =>
                      updateUrlParams(currentPage + 1, searchInput)
                    }
                    className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                      currentPage === totalPages
                        ? "opacity-30 pointer-events-none text-default-300"
                        : "text-foreground hover:bg-default-100 cursor-pointer"
                    }`}
                  >
                    <span className="hidden sm:block">Next</span>
                    <Pagination.NextIcon className="size-4 shrink-0" />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
