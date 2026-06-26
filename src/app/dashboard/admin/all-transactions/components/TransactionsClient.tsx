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
import { LuArrowLeft, LuSearch, LuX } from "react-icons/lu";

interface Transaction {
  _id: string;
  stripeSessionId: string;
  lawyerEmail: string;
  amountPaid: number;
  paymentType: string;
  paymentStatus: string;
  createdAt: string;
}

interface TransactionsClientProps {
  initialData: {
    transactions: Transaction[];
    totalPages: number;
    total: number;
    page: number;
    limit: number;
  };
}

export default function TransactionsClient({
  initialData,
}: TransactionsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL query state extraction loops
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentLimit = Number(searchParams.get("limit")) || 10;

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Sync state cleanly with server initial data payload
  const transactions = initialData?.transactions || [];
  const totalPages = initialData?.totalPages || 1;
  const totalResults = initialData?.total || 0;

  // Global routing query modifier method
  const updateUrlParams = (
    newPage: number,
    newSearch: string,
    newLimit: number,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(1, searchInput, currentLimit);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateUrlParams(1, "", currentLimit);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start">
        <Link href="/dashboard">
          <Button
            size="sm"
            variant="secondary"
            className="bg-default-100 hover:bg-default-200 text-default-700 font-semibold rounded-xl text-xs flex items-center gap-2 h-9 px-4 transition-all"
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
              Premium Verification Ledger
            </h1>
            <p className="text-xs text-default-400">
              Audit track of lifetime activation licenses granted to legal
              practitioners.
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
                  placeholder="Search email or stripe code..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full text-xs"
                />

                {searchInput && (
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="focus:outline-none p-0.5 rounded-full hover:bg-default-200 flex items-center justify-center"
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
          aria-label="Lawyer Premium Transactions Table"
          className="border-none"
        >
          <Table.ScrollContainer>
            <Table.Content className="min-w-[800px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-default-50 text-default-600 font-bold text-xs py-3"
                >
                  Premium Practitioner
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Stripe Session Reference
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Gateway Status
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Amount
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Settlement Date
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {transactions.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      className="text-center text-default-400 py-10"
                      colSpan={5}
                    >
                      No financial matches located.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  transactions.map((tx) => {
                    const initials = tx.lawyerEmail
                      ? tx.lawyerEmail.substring(0, 2).toUpperCase()
                      : "LY";
                    return (
                      <Table.Row
                        key={tx._id}
                        className="border-b border-default-50 hover:bg-default-50/50 transition-all duration-150"
                      >
                        <Table.Cell>
                          <div className="flex items-center gap-3 py-1">
                            <Avatar className="w-9 h-9 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
                              <Avatar.Fallback>{initials}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-foreground">
                                {tx.lawyerEmail}
                              </span>
                              <span className="text-[10px] text-amber-600 font-medium bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded-md mt-0.5 w-max">
                                Lifetime Premium
                              </span>
                            </div>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-[11px] font-mono bg-default-100 text-default-600 px-2.5 py-1 rounded-lg select-all">
                            {tx.stripeSessionId}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                            {tx.paymentStatus || "completed"}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="text-xs font-bold text-foreground">
                          ${tx.amountPaid ? tx.amountPaid.toFixed(2) : "149.00"}
                        </Table.Cell>

                        <Table.Cell className="text-xs text-default-500 font-medium">
                          {new Date(tx.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-default-100">
          <div className="flex items-center gap-4 text-[11px] text-default-400">
            <p>
              Showing{" "}
              {totalResults === 0 ? 0 : (currentPage - 1) * currentLimit + 1} -{" "}
              {Math.min(currentPage * currentLimit, totalResults)} of{" "}
              {totalResults} audit records
            </p>
            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={currentLimit}
                onChange={(e) => {
                  updateUrlParams(1, searchInput, Number(e.target.value));
                }}
                className="bg-default-100 text-foreground text-[11px] px-1.5 py-1 rounded-md border border-default-200 outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          {totalPages > 1 && (
            <Pagination className="justify-center">
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={currentPage === 1}
                    onPress={() =>
                      updateUrlParams(
                        currentPage - 1,
                        searchInput,
                        currentLimit,
                      )
                    }
                  >
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === currentPage}
                        onPress={() =>
                          updateUrlParams(p, searchInput, currentLimit)
                        }
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
                      updateUrlParams(
                        currentPage + 1,
                        searchInput,
                        currentLimit,
                      )
                    }
                  >
                    <span>Next</span>
                    <Pagination.NextIcon />
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
