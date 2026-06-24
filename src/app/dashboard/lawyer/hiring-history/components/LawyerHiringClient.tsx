"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  Select,
  ListBox,
  Pagination,
  Button,
  Chip,
} from "@heroui/react";
import { Magnifier, ChevronDown, Check, Xmark } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { updateHiringRequestStatus } from "@/lib/actions/hiringRequest";

interface HiringRequest {
  _id: string | { $oid: string };
  clientName: string;
  clientEmail: string;
  caseTitle: string;
  caseDescription: string;
  hourlyFee: string;
  status: "pending" | "accepted" | "rejected";
  paymentStatus: "pending" | "paid";
  createdAt: any;
}

interface Props {
  initialRequests: HiringRequest[];
}

export default function LawyerHiringClient({ initialRequests }: Props) {
  const [requests, setRequests] = useState<HiringRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getRequestIdStr = (req: HiringRequest) => {
    return typeof req._id === "object" && "$oid" in req._id
      ? req._id.$oid
      : (req._id as string);
  };

  const formatRequestDate = (dateData: any) => {
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

  const handleStatusUpdate = async (
    id: string,
    newStatus: "accepted" | "rejected",
  ) => {
    setActionLoading(id);
    try {
      const res = await updateHiringRequestStatus(id, newStatus);
      if (res) {
        toast.success(`Proposal ${newStatus} successfully!`);
        setRequests((prev) =>
          prev.map((r) =>
            getRequestIdStr(r) === id ? { ...r, status: newStatus } : r,
          ),
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        r.clientName.toLowerCase().includes(search.toLowerCase()) ||
        r.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
        r.caseTitle.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const itemsPerPage = parseInt(rowsPerPage);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const paginatedRequests = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, page, itemsPerPage]);

  return (
    <div className="space-y-6 text-foreground bg-background w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3A75] dark:text-white">
          Hiring History
        </h1>
        <p className="text-xs text-default-400 mt-0.5">
          Manage and review client contract proposals and case records
        </p>
      </div>

      {/* search and table controller component*/}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-content1 border border-default-100 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <Magnifier className="size-4 text-default-400" />
            </div>
            <input
              type="text"
              aria-label="Search hiring requests"
              placeholder="Search by client or case..."
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
              aria-label="Filter by status"
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
                <MakeCollectionListBox>
                  <ListBox.Item id="all">All Status</ListBox.Item>
                  <ListBox.Item id="pending">Pending</ListBox.Item>
                  <ListBox.Item id="accepted">Accepted</ListBox.Item>
                  <ListBox.Item id="rejected">Rejected</ListBox.Item>
                </MakeCollectionListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-default-400 font-semibold w-full lg:w-auto justify-end">
          <span>Show</span>
          <div className="w-20">
            <Select
              aria-label="Rows per page select"
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
                <MakeCollectionListBox>
                  <ListBox.Item id="5">5</ListBox.Item>
                  <ListBox.Item id="10">10</ListBox.Item>
                  <ListBox.Item id="20">20</ListBox.Item>
                </MakeCollectionListBox>
              </Select.Popover>
            </Select>
          </div>
          <span>entries</span>
        </div>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Hiring ledger table matrix">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Case Title</Table.Column>
              <Table.Column>Request Date</Table.Column>
              <Table.Column>Proposal Status</Table.Column>
              <Table.Column>Payment Status</Table.Column>
              <Table.Column>Action Panel</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedRequests.length === 0 ? (
                <Table.Row className="hover:bg-transparent">
                  <Table.Cell>
                    <span className="text-2xl block mb-1">📁</span>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-default-400 text-xs">
                    No hiring records or proposals found.
                  </Table.Cell>
                  <Table.Cell aria-hidden="true">
                    <span></span>
                  </Table.Cell>
                  <Table.Cell aria-hidden="true">
                    <span></span>
                  </Table.Cell>
                  <Table.Cell aria-hidden="true">
                    <span></span>
                  </Table.Cell>
                  <Table.Cell aria-hidden="true">
                    <span></span>
                  </Table.Cell>
                  <Table.Cell aria-hidden="true">
                    <span></span>
                  </Table.Cell>
                </Table.Row>
              ) : (
                paginatedRequests.map((req) => {
                  const reqId = getRequestIdStr(req);

                  const getStatusColor = (status: string) => {
                    if (status === "accepted") return "success" as const;
                    if (status === "pending") return "warning" as const;
                    return "danger" as const;
                  };

                  return (
                    <Table.Row
                      key={reqId}
                      className="hover:bg-default-50/50 transition-colors border-b border-default-100/50"
                    >

                      <Table.Cell className="font-semibold text-sm">
                        {req.clientName}
                      </Table.Cell>

                      <Table.Cell className="text-default-500 text-sm">
                        {req.clientEmail}
                      </Table.Cell>

                      <Table.Cell className="text-sm font-medium text-default-700 max-w-xs truncate">
                        {req.caseTitle}
                      </Table.Cell>

                      <Table.Cell className="text-default-500 text-sm">
                        {formatRequestDate(req.createdAt)}
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={getStatusColor(req.status)}
                          className="font-bold uppercase text-[10px] px-2"
                        >
                          {req.status}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={
                            req.paymentStatus === "paid" ? "success" : "danger"
                          }
                          className="font-bold text-[11px]"
                        >
                          {req.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        {req.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              isDisabled={actionLoading !== null}
                              onPress={() =>
                                handleStatusUpdate(reqId, "rejected")
                              }
                              className="h-8 text-[11px] font-bold rounded-lg border border-danger/20 text-danger bg-danger/5 hover:bg-danger/10"
                            >
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              isDisabled={actionLoading !== null}
                              onPress={() =>
                                handleStatusUpdate(reqId, "accepted")
                              }
                              className="h-8 text-[11px] font-bold rounded-lg bg-[#1D44B7] text-white px-3.5 shadow-sm hover:bg-[#153491]"
                            >
                              Accept
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-default-400 italic font-medium">
                            Processed
                          </span>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 w-full border-t border-default-100/60 mt-2">
              <Pagination.Summary className="text-default-400 text-xs font-semibold">
                Showing {(page - 1) * itemsPerPage + 1}-
                {Math.min(filteredRequests.length, page * itemsPerPage)} of{" "}
                {filteredRequests.length} results
              </Pagination.Summary>

              <Pagination className="justify-center">
                <Pagination.Content className="bg-content1 border border-default-200 rounded-xl shadow-sm">
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(p - 1, 1))}
                      className="cursor-pointer"
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
                          className={`cursor-pointer transition-all ${
                            p === page
                              ? "bg-[#1D44B7] text-white font-bold rounded-lg shadow-sm hover:bg-[#153491]"
                              : "text-default-600 hover:bg-default-100"
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
                      className="cursor-pointer"
                    >
                      <span>Next</span>
                      <Pagination.NextIcon />
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

function MakeCollectionListBox({ children }: { children: React.ReactNode }) {
  return (
    <ListBox aria-label="Inner collection layout select options">
      {children}
    </ListBox>
  );
}
