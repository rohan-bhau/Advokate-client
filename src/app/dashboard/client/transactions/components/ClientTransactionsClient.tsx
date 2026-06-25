"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  Pagination,
  Button,
  TextField,
  InputGroup,
} from "@heroui/react";
import { getClientTransactions } from "@/lib/api/client";
import Link from "next/link";
import { LuArrowLeft, LuSearch, LuX } from "react-icons/lu";

export default function ClientTransactionsClient({
  clientEmail,
}: {
  clientEmail: string;
}) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getClientTransactions(
          clientEmail,
          search,
          page,
          limit,
        );
        setTransactions(data.transactions || []);
        setTotalPages(data.totalPages || 1);
          setTotalResults(data.total || 0);
          console.log(data)
      } catch (err) {
        console.error("Ledger acquisition failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [clientEmail, search, page, limit]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start">
        <Link href="/dashboard/client">
          <Button
            size="sm"
            variant="outline"
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
              My Outgoing Payments
            </h1>
            <p className="text-xs text-default-400">
              Track all secure case retainers statement settled via Stripe
              gateway.
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
                  placeholder="Search lawyer email or stripe code..."
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
          aria-label="Client outgoing ledger table"
          className="border-none shadow-none"
        >
          <Table.ScrollContainer>
            <Table.Content className="min-w-[800px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-default-50 text-default-600 font-bold text-xs py-3"
                >
                  Paid To (Lawyer)
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Transaction Code
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Status
                </Table.Column>
                <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-3">
                  Amount
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
                      {loading
                        ? "Synchronizing secure ledger..."
                        : "No payment logs located."}
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
                          <div className="flex items-center gap-2.5">
                            <Avatar className="w-7 h-7 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600">
                              <Avatar.Fallback>{initials}</Avatar.Fallback>
                            </Avatar>
                            <span className="text-xs font-semibold text-foreground select-all">
                              {tx.lawyerEmail}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-[11px] font-mono bg-default-100 text-default-600 px-2.5 py-1 rounded-lg select-all">
                            {tx.stripeSessionId}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                            Completed
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
                    );
                  })
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-default-100">
          <p className="text-[11px] text-default-400">
            Showing {totalResults === 0 ? 0 : (page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, totalResults)} of {totalResults} settlement
            briefs
          </p>

          {totalPages > 1 && (
            <Pagination className="justify-center">
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => p - 1)}
                  >
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === page}
                        onPress={() => setPage(p)}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => p + 1)}
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
