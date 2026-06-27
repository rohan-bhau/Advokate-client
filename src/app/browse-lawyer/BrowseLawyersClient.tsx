"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Card,
  Avatar,
  Badge,
  Select,
  ListBox,
  Chip,
  Pagination,
} from "@heroui/react";
import { Magnifier, ChevronDown, Star } from "@gravity-ui/icons";
import { SPECIALIZATIONS } from "../dashboard/lawyer/manage-legal-profile/specializations";
import { GrLocation } from "react-icons/gr";

interface LawyerData {
  id?: string;
  _id?: string;
  professionalName: string;
  specialization: string;
  bio: string;
  details: string;
  hourlyFee: string;
  location: string;
  availabilityStatus: "Available" | "Busy";
  image: string;
  status: "pending" | "approved" | "rejected";
  averageRating?: number;
  totalReviews?: number;
}

interface BrowseLawyersClientProps {
  initialData: {
    lawyers: LawyerData[];
    total: number;
    totalPages: number;
  };
}

export default function BrowseLawyersClient({
  initialData,
}: BrowseLawyersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state management parameters synchronization
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentAvailability = searchParams.get("availability") || "all";
  const currentSort = searchParams.get("sort") || "default";

  // Transient search input boundary state
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Read clean aggregated datasets from server props directly
  const lawyers = initialData?.lawyers || [];
  const totalResults = initialData?.total || 0;
  const totalPages = initialData?.totalPages || 1;

  // Global URL modifier block pipeline
  const updateUrlParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "all" || value === "default" || !value) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchInput, page: 1 });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateUrlParams({ search: "", page: 1 });
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
    <div className="space-y-8 bg-background text-foreground min-h-screen p-4 sm:p-8">
      {/* Title Header Layout Block */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          Directory
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-1 text-foreground">
          Browse Lawyers
        </h1>
        <p className="text-sm text-default-400 mt-1">
          {totalResults} attorneys available found
        </p>
      </div>

      {/* Synchronized Filtering Interface Component */}
      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center bg-content1 border border-default-200/60 p-4 rounded-2xl shadow-md"
      >
        <div className="relative w-full lg:col-span-2">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Magnifier className="h-4 w-4 text-default-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full h-12 rounded-xl border border-default-200 bg-background pl-11 pr-10 text-sm text-foreground outline-none focus:border-blue-500 transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-4 flex items-center text-default-400 hover:text-foreground text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <Select
          placeholder="All Categories"
          selectedKey={currentCategory}
          onSelectionChange={(k) =>
            updateUrlParams({ category: k as string, page: 1 })
          }
          className="w-full bg-background border border-default-200 rounded-xl min-h-12 text-foreground"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator>
              <ChevronDown className="text-default-400" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-content1 border border-default-200 text-foreground">
              <ListBox.Item id="all" textValue="All Categories">
                <label>All Categories</label>
              </ListBox.Item>
              {SPECIALIZATIONS.map((item) => (
                <ListBox.Item
                  key={item.value}
                  id={item.value}
                  textValue={item.label}
                >
                  <label>{item.label}</label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          placeholder="Availability"
          selectedKey={currentAvailability}
          onSelectionChange={(k) =>
            updateUrlParams({ availability: k as string, page: 1 })
          }
          className="w-full bg-background border border-default-200 rounded-xl min-h-12 text-foreground"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator>
              <ChevronDown className="text-default-400" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-content1 border border-default-200 text-foreground">
              <ListBox.Item id="all" textValue="All Availability">
                <label>All Status</label>
              </ListBox.Item>
              <ListBox.Item id="Available" textValue="Available">
                <label>Available</label>
              </ListBox.Item>
              <ListBox.Item id="Busy" textValue="Busy">
                <label>Busy</label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          placeholder="Sort By Fees"
          selectedKey={currentSort}
          onSelectionChange={(k) =>
            updateUrlParams({ sort: k as string, page: 1 })
          }
          className="w-full bg-background border border-default-200 rounded-xl min-h-12 text-foreground"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator>
              <ChevronDown className="text-default-400" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-content1 border border-default-200 text-foreground">
              <ListBox.Item id="default" textValue="Default Sorting">
                <label>Default Sorting</label>
              </ListBox.Item>
              <ListBox.Item
                id="fee-asc"
                textValue="Consultation Fee: Low to High"
              >
                <label>Fee: Low to High</label>
              </ListBox.Item>
              <ListBox.Item
                id="fee-desc"
                textValue="Consultation Fee: High to Low"
              >
                <label>Fee: High to Low</label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </form>

      {/* Grid Architecture Stack */}
      <div className="w-full">
        {lawyers.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-default-200 bg-content1/50 rounded-3xl">
            <p className="text-default-500 font-medium text-lg">
              No legal counselors found matching criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {lawyers.map((lawyer) => (
              <Card
                key={lawyer._id || lawyer.id}
                onClick={() =>
                  router.push(`/browse-lawyer/${lawyer._id || lawyer.id}`)
                }
                className="bg-content1 border border-default-100 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-2 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between w-full gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                        <div>
                          <Badge.Anchor>
                            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border border-default-200 rounded-full overflow-hidden flex-shrink-0">
                              <Avatar.Image src={lawyer.image} />
                              <Avatar.Fallback>
                                {lawyer.professionalName
                                  ? lawyer.professionalName
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")
                                      .toUpperCase()
                                      .slice(0, 2)
                                  : "JD"}
                              </Avatar.Fallback>
                            </Avatar>
                            <Badge
                              color={
                                lawyer.availabilityStatus === "Available"
                                  ? "success"
                                  : "danger"
                              }
                              placement="bottom-right"
                              size="sm"
                            />
                          </Badge.Anchor>
                        </div>

                        <div className=" flex flex-col gap-0.5 ">
                          <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
                            {lawyer.professionalName}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 truncate tracking-wide">
                            {SPECIALIZATIONS.find(
                              (s) => s.value === lawyer.specialization,
                            )?.label || lawyer.specialization}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        lawyer.availabilityStatus === "Available"
                          ? "success"
                          : "danger"
                      }
                      className="font-bold text-[9px] sm:text-[10px] px-1.5 flex-shrink-0"
                    >
                      {lawyer.availabilityStatus}
                    </Chip>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="size-3.5 fill-amber-500" />
                      <span>{lawyer.averageRating}</span>
                      <span className="text-default-400 text-[11px] font-normal">
                        ({lawyer.totalReviews || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-default-400 font-medium">
                      <GrLocation className="size-3.5 text-default-400 flex-shrink-0" />
                      <span className="truncate">
                        {lawyer.location || "Dhaka Bangladesh"}
                      </span>
                    </div>
                  </div>
                </div>

                <Card.Footer className="border-t border-default-100 bg-default-50/50 px-4 sm:px-5 py-3 flex items-center justify-between gap-2 mt-auto w-full">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-base sm:text-lg font-extrabold text-foreground">
                      ${Number(lawyer.hourlyFee).toString()}
                    </span>
                    <span className="text-[10px] text-default-400 font-bold">
                      /hr
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-default-400 group-hover:text-blue-500 transition-colors flex items-center gap-1">
                    View Profile &rarr;
                  </span>
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 pt-8 w-full border-t border-default-100 overflow-hidden">
        <p className="text-default-400 text-xs font-semibold text-center md:text-left">
          Showing Page {currentPage} of {totalPages} Results
        </p>

        <div className="flex justify-center md:justify-end max-w-full">
          <Pagination className="justify-center">
            <Pagination.Content className="bg-content1 border border-default-200 rounded-xl shadow-sm flex flex-wrap items-center justify-center gap-0 max-w-max mx-auto overflow-hidden">
              {/* Previous Button */}
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage === 1}
                  onPress={() =>
                    updateUrlParams({ page: Math.max(currentPage - 1, 1) })
                  }
                  className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                    currentPage === 1
                      ? "opacity-30 pointer-events-none text-default-300"
                      : "text-foreground hover:bg-default-100"
                  }`}
                >
                  <Pagination.PreviousIcon className="size-4 shrink-0" />
                  <span className="hidden sm:block">Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {/* Dynamic Ellipsis Page Loop */}
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <div className="px-2 text-default-400 text-xs select-none">
                      ...
                    </div>
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === currentPage}
                      onPress={() => updateUrlParams({ page: p })}
                      className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 text-xs font-bold flex items-center justify-center transition-all ${
                        currentPage === p
                          ? "bg-[#1D44B7] text-white rounded-lg shadow-sm"
                          : "text-default-500 hover:bg-default-100 rounded-lg"
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
                  isDisabled={currentPage === totalPages}
                  onPress={() =>
                    updateUrlParams({
                      page: Math.min(currentPage + 1, totalPages),
                    })
                  }
                  className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                    currentPage === totalPages
                      ? "opacity-30 pointer-events-none text-default-300"
                      : "text-foreground hover:bg-default-100"
                  }`}
                >
                  <span className="hidden sm:block">Next</span>
                  <Pagination.NextIcon className="size-4 shrink-0" />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
