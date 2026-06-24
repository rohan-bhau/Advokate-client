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
import { Magnifier, ChevronDown, Eye } from "@gravity-ui/icons";
import { ClientHiringModal } from "./ClientHiringModal";

interface HiringRequest {
  _id: string | { $oid: string };
  lawyerName: string;
  lawyerEmail: string;
  specialization: string;
  caseTitle: string;
  caseDescription: string;
  hourlyFee: string;
  status: "pending" | "accepted" | "rejected";
  paymentStatus: "pending" | "paid";
  caseStatus: "active" | "won";
  createdAt: any;
}

interface Props {
  initialRequests: HiringRequest[];
}

export default function ClientHiringClient({ initialRequests }: Props) {
  const [requests] = useState<HiringRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HiringRequest | null>(
    null,
  );

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

  const openDetails = (req: HiringRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        r.lawyerName.toLowerCase().includes(search.toLowerCase()) ||
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
          Track and manage your submitted attorney retainers and billing
          settlements.
        </p>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-content1 border border-default-100 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <Magnifier className="size-4 text-default-400" />
            </div>
            <input
              type="text"
              aria-label="Search lawyer requests"
              placeholder="Search by lawyer or case..."
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
              aria-label="Filter by proposal status"
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
                <ListBox aria-label="Status selection filter options">
                  <ListBox.Item id="all">All Status</ListBox.Item>
                  <ListBox.Item id="pending">Pending</ListBox.Item>
                  <ListBox.Item id="accepted">Accepted</ListBox.Item>
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
              aria-label="Rows limit select"
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
                <ListBox aria-label="Entries bounds configuration">
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

      {/*  Main Core Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Client billing and retainer directory matrix">
            <Table.Header>
              <Table.Column isRowHeader>Lawyer Name</Table.Column>
              <Table.Column>Specialization</Table.Column>
              <Table.Column>Hourly Fee</Table.Column>
              <Table.Column>Hiring Date</Table.Column>
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
                    No contract history ledger found.
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
                        <div className="flex flex-col">
                          <span>{req.lawyerName}</span>
                          <span className="text-[10px] text-default-400 font-normal">
                            {req.lawyerEmail}
                          </span>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="text-sm font-medium text-default-600 capitalize">
                        {req.specialization}
                      </Table.Cell>

                      <Table.Cell className="text-sm font-bold text-foreground">
                        ${req.hourlyFee}/hr
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
                        {req.status === "accepted" &&
                        req.paymentStatus === "pending" ? (
                          <span
                            onClick={() => openDetails(req)}
                            className="text-[11px] bg-danger/10 text-danger border border-danger/20 font-bold px-2 py-0.5 rounded-md cursor-pointer hover:bg-danger/20 transition-all animate-pulse"
                          >
                            Click to Pay
                          </span>
                        ) : (
                          <Chip
                            size="sm"
                            variant="soft"
                            color={
                              req.paymentStatus === "paid"
                                ? "success"
                                : "default"
                            }
                            className="font-bold text-[10px]"
                          >
                            {req.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                          </Chip>
                        )}
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          size="sm"
                          variant="secondary"
                          onPress={() => openDetails(req)}
                          className="h-8 text-[11px] font-bold rounded-lg border border-default-200 text-default-600 bg-default-50 hover:bg-default-100"
                        >
                          <Eye className="size-3.5" /> View Details
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Pagination Controls Footer */}
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
                          className={`cursor-pointer transition-all ${p === page ? "bg-[#1D44B7] text-white font-bold rounded-lg shadow-sm hover:bg-[#153491]" : "text-default-600 hover:bg-default-100"}`}
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

      <ClientHiringModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        request={selectedRequest}
      />
    </div>
  );
}
