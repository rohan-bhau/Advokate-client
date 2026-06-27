"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Select,
  ListBox,
  Pagination,
  Chip,
  Skeleton,
} from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";
import { UpdateLawyerStatus } from "./UpdateLawyerStatus";
import { DeleteLawyerProfile } from "./DeleteLawyerProfile";

export interface LawyerInfo {
  _id: string | { $oid: string };
  professionalName: string;
  lawyerEmail: string;
  specialization: string;
  hourlyFee: string;
  status: "pending" | "approved" | "rejected";
  createdAt: any;
}

interface Props {
  initialLawyers: LawyerInfo[];
}

export default function ManageLawyersClient({ initialLawyers }: Props) {
  const [lawyers, setLawyers] = useState<LawyerInfo[]>(initialLawyers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // সিমুলেটেড স্কেলিটন ইফেক্ট লোড
  useEffect(() => {
    if (initialLawyers) {
      setLawyers(initialLawyers);
           const timer = setTimeout(() => setIsLoading(false), 600);
           return () => clearTimeout(timer);
    }
  }, [initialLawyers]);

  const getLawyerIdStr = (lawyer: LawyerInfo) => {
    return typeof lawyer._id === "object" && "$oid" in lawyer._id
      ? lawyer._id.$oid
      : (lawyer._id as string);
  };

  const formatJoinedDate = (dateData: any) => {
    try {
      const rawDate =
        typeof dateData === "object" && "$date" in dateData
          ? dateData.$date
          : dateData;
      if (!rawDate) return "N/A";
      return new Date(rawDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((l) => {
      const matchesSearch =
        l.professionalName.toLowerCase().includes(search.toLowerCase()) ||
        l.lawyerEmail.toLowerCase().includes(search.toLowerCase()) ||
        l.specialization.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lawyers, search, statusFilter]);

  const itemsPerPage = parseInt(rowsPerPage);
  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage) || 1;
  const paginatedLawyers = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredLawyers.slice(start, start + itemsPerPage);
  }, [filteredLawyers, page, itemsPerPage]);

  const getStatusColor = (status: string) => {
    if (status === "approved") return "success" as const;
    if (status === "pending") return "warning" as const;
    if (status === "rejected") return "danger" as const;
    return "default" as const;
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6 text-foreground bg-background w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3A75] dark:text-white">
          Manage Lawyer Profiles
        </h1>
        <p className="text-xs text-default-400 mt-0.5">
          Review, approve, reject or delete lawyer applications.
        </p>
      </div>

      {/* Filter and Actions Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-content1 border border-default-100 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <Magnifier className="size-4 text-default-400" />
            </div>
            <input
              type="text"
              aria-label="Search lawyers"
              placeholder="Search lawyers, categories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-10 rounded-xl border border-default-200 bg-background pl-10 pr-4 text-sm text-foreground outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="w-full sm:w-44">
            <Select
              aria-label="Filter by Status"
              placeholder="All Status"
              selectedKey={statusFilter}
              onSelectionChange={(k) => {
                setStatusFilter(k as string);
                setPage(1);
              }}
              className="w-full bg-background border border-default-200 rounded-xl min-h-10 text-sm"
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="all">All Status</ListBox.Item>
                  <ListBox.Item id="pending">Pending</ListBox.Item>
                  <ListBox.Item id="approved">Approved</ListBox.Item>
                  <ListBox.Item id="rejected">Rejected</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-default-400 font-semibold w-full lg:w-auto justify-end">
          <span>Show</span>
          <div className="w-20">
            <Select
              aria-label="Rows per page"
              selectedKey={rowsPerPage}
              onSelectionChange={(k) => {
                setRowsPerPage(k as string);
                setPage(1);
              }}
              className="w-full bg-background border border-default-200 rounded-xl min-h-8 text-xs"
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="5">5</ListBox.Item>
                  <ListBox.Item id="10">10</ListBox.Item>
                  <ListBox.Item id="20">20</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
          <span>entries</span>
        </div>
      </div>

      {/* Table Data */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Lawyers profile management table">
            <Table.Header>
              <Table.Column isRowHeader>Lawyer</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Specialization</Table.Column>
              <Table.Column>Fee/Hr</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Joined At</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {isLoading ? (
                // Skeleton Effect Rendering Rows
                Array.from({ length: parseInt(rowsPerPage) }).map(
                  (_, index) => (
                    <Table.Row key={`skeleton-${index}`}>
                      <Table.Cell>
                        <Skeleton className="h-4 w-32 rounded-lg" />
                      </Table.Cell>
                      <Table.Cell>
                        <Skeleton className="h-4 w-40 rounded-lg" />
                      </Table.Cell>
                      <Table.Cell>
                        <Skeleton className="h-4 w-36 rounded-lg" />
                      </Table.Cell>
                      <Table.Cell>
                        <Skeleton className="h-4 w-12 rounded-lg" />
                      </Table.Cell>
                      <Table.Cell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </Table.Cell>
                      <Table.Cell>
                        <Skeleton className="h-4 w-24 rounded-lg" />
                      </Table.Cell>
                      <Table.Cell>
                        <Skeleton className="h-8 w-24 rounded-xl" />
                      </Table.Cell>
                    </Table.Row>
                  ),
                )
              ) : paginatedLawyers.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    className="text-center text-default-400 py-8"
                    colSpan={7}
                  >
                    No lawyer profiles found.
                  </Table.Cell>
                </Table.Row>
              ) : (
                paginatedLawyers.map((lawyer) => {
                  const lid = getLawyerIdStr(lawyer);

                  return (
                    <Table.Row
                      key={lid}
                      className="hover:bg-default-50/50 transition-colors border-b border-default-100/50"
                    >
                      <Table.Cell className="font-semibold text-sm">
                        {lawyer.professionalName}
                      </Table.Cell>
                      <Table.Cell className="text-default-500 text-sm">
                        {lawyer.lawyerEmail}
                      </Table.Cell>
                      <Table.Cell className="text-sm max-w-[200px] truncate">
                        {lawyer.specialization}
                      </Table.Cell>
                      <Table.Cell className="font-medium text-sm">
                        ${lawyer.hourlyFee}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={getStatusColor(lawyer.status)}
                          className="font-bold uppercase text-[10px] px-2"
                        >
                          {lawyer.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell className="text-default-500 text-sm">
                        {formatJoinedDate(lawyer.createdAt)}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <UpdateLawyerStatus
                            lawyer={lawyer}
                            currentStatus={lawyer.status}
                            onUpdateSuccess={(targetId, newStatus) => {
                              setLawyers((prev) =>
                                prev.map((l) =>
                                  getLawyerIdStr(l) === targetId
                                    ? { ...l, status: newStatus as any }
                                    : l,
                                ),
                              );
                            }}
                          />
                          <DeleteLawyerProfile
                            lawyer={lawyer}
                            onDeleteSuccess={(deletedId) => {
                              const deletedIdStr =
                                typeof deletedId === "object" &&
                                "$oid" in deletedId
                                  ? deletedId.$oid
                                  : deletedId;
                              setLawyers((prev) =>
                                prev.filter(
                                  (l) => getLawyerIdStr(l) !== deletedIdStr,
                                ),
                              );
                            }}
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Client-side Pagination */}
        <Table.Footer>
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 w-full border-t border-default-100/60 mt-2 overflow-hidden">
              <Pagination.Summary className="text-default-400 text-xs font-semibold">
                Showing {(page - 1) * itemsPerPage + 1}-
                {Math.min(filteredLawyers.length, page * itemsPerPage)} of{" "}
                {filteredLawyers.length} results
              </Pagination.Summary>

              <Pagination className="justify-center">
                <Pagination.Content className="bg-content1 border border-default-200 rounded-xl shadow-sm flex flex-wrap items-center justify-center gap-0 max-w-max mx-auto overflow-hidden">
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(p - 1, 1))}
                      className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                        page === 1
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
                          isActive={p === page}
                          onPress={() => setPage(p)}
                          className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                            page === p
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
                      isDisabled={page === totalPages}
                      onPress={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                      className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                        page === totalPages
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
            </div>
          )}
        </Table.Footer>
      </Table>
    </div>
  );
}
