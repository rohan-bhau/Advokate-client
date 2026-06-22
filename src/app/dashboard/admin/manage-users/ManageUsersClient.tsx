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
import { Magnifier, ChevronDown, TrashBin, Pencil } from "@gravity-ui/icons";
import { DeleteUser } from "./DeleteUser";

interface UserInfo {
  _id: string | { $oid: string };
  name: string;
  email: string;
  role:  "moderator" | "lawyer" | "client";
  createdAt: any;
}

interface Props {
  initialUsers: UserInfo[];
  adminId: string;
}

export default function ManageUsersClient({ initialUsers, adminId }: Props) {
  const [users] = useState<UserInfo[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [page, setPage] = useState(1);

  const getUserIdStr = (user: UserInfo) => {
    return typeof user._id === "object" && "$oid" in user._id
      ? user._id.$oid
      : (user._id as string);
  };

  // Date Formatting Function
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

  // Search and Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // Pagination Logic
  const itemsPerPage = parseInt(rowsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, page, itemsPerPage]);

  return (
    <div className="space-y-6 text-foreground bg-background w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3A75] dark:text-white">
          Manage Users
        </h1>
        <p className="text-xs text-default-400 mt-0.5">
          Platform Authorization Matrix
        </p>
      </div>

      {/* Top Controls Box: Search, Filter & Entries */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-content1 border border-default-100 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <Magnifier className="size-4 text-default-400" />
            </div>
            <input
              type="text"
              aria-label="Search users input"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-10 rounded-xl border border-default-200 bg-background pl-10 pr-4 text-sm text-foreground outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Role Filter Selector */}
          <div className="w-full sm:w-44">
            <Select
              aria-label="Filter by role"
              placeholder="All Roles"
              selectedKey={roleFilter}
              onSelectionChange={(k) => {
                setRoleFilter(k as string);
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
                  <ListBox.Item id="all">All Roles</ListBox.Item>
                  <ListBox.Item id="moderator">Moderator</ListBox.Item>
                  <ListBox.Item id="lawyer">Lawyer</ListBox.Item>
                  <ListBox.Item id="client">Client</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Rows Per Page Dropdown */}
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

      {/* Main Users Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Users database matrix table">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Joined At</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {paginatedUsers.map((user) => {
                const uid = getUserIdStr(user);
                const isSelf = uid === adminId; 

                // Color mapping logic for different roles
                const getRoleColor = (role: string) => {
                  if (role === "moderator") return "warning" as const;
                  if (role === "admin") return "danger" as const;
                  if (role === "lawyer") return "success" as const;
                  if (role === "client") return "accent" as const;
                  return "default" as const;
                };

                return (
                  <Table.Row
                    key={uid}
                    className="hover:bg-default-50/50 transition-colors border-b border-default-100/50"
                  >
                    <Table.Cell className="font-semibold text-sm">
                      {user.name}{" "}
                      {isSelf && (
                        <span className="text-xs font-normal text-default-400">
                          (You)
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="text-default-500 text-sm">
                      {user.email}
                    </Table.Cell>
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={getRoleColor(user.role)}
                        className="font-bold uppercase text-[10px] px-2"
                      >
                        {user.role}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="text-default-500 text-sm">
                      {formatJoinedDate(user.createdAt)}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {/* Change Role Button  */}
                        <Button
                          size="sm"
                          variant="ghost"
                          isDisabled={isSelf}
                          className={`border-default-200 rounded-xl font-bold text-xs px-3 transition-all ${
                            isSelf
                              ? "opacity-40 cursor-not-allowed text-default-400 bg-transparent hover:bg-transparent hover:text-default-400"
                              : "text-default-600 hover:text-blue-600 hover:bg-blue-50/50"
                          }`}
                        >
                          <Pencil className="size-3.5" />
                          Change Role
                        </Button>

                        {/* Delete Button */}
                        <DeleteUser user={user} isSelf={isSelf} />
                        {/* <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          isDisabled={isSelf}
                          className={`border-default-200 rounded-xl transition-all ${
                            isSelf
                              ? "opacity-40 cursor-not-allowed text-default-300 bg-transparent hover:bg-transparent hover:text-default-300"
                              : "text-default-400 hover:text-danger hover:bg-danger-50"
                          }`}
                        >
                          <TrashBin className="size-4" />
                        </Button> */}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Footer Container with Highlighted Pagination */}
        <Table.Footer>
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 w-full border-t border-default-100/60 mt-2">
              <Pagination.Summary className="text-default-400 text-xs font-semibold">
                Showing {(page - 1) * itemsPerPage + 1}-
                {Math.min(filteredUsers.length, page * itemsPerPage)} of{" "}
                {filteredUsers.length} results
              </Pagination.Summary>

              <Pagination className="justify-center">
                <Pagination.Content className="bg-content1 border border-default-200 rounded-xl shadow-sm">
                  {/* Previous Button */}
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

                  {/* Pages loop block containing active highlighters */}
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

                  {/* Next Button */}
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
