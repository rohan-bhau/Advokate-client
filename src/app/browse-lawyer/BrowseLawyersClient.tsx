"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  Avatar,
  Badge,
  Select,
  ListBox,
  Chip,
  Pagination,
  Skeleton,
} from "@heroui/react";
import { Magnifier, ChevronDown, Star } from "@gravity-ui/icons";
import { SPECIALIZATIONS } from "../dashboard/lawyer/manage-legal-profile/specializations";
import { getLawyers } from "@/lib/api/legalProfiles";
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
}

export default function BrowseLawyersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1");
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialAvailability = searchParams.get("availability") || "all";
  const initialSort = searchParams.get("sort") || "default";

  const [lawyers, setLawyers] = useState<LawyerData[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [availability, setAvailability] = useState(initialAvailability);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  const fetchFilteredLawyers = async () => {
    setIsLoading(true);
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category !== "all") query.set("category", category);
    if (availability !== "all") query.set("availability", availability);
    if (sort !== "default") query.set("sort", sort);
    query.set("page", page.toString());
    query.set("limit", "8");

    router.push(`/browse-lawyer?${query.toString()}`, { scroll: false });

    try {
      const response = await getLawyers(`?${query.toString()}`);
      setLawyers(response.lawyers || []);
      setTotalResults(response.total || 0);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error("Error loading profiles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredLawyers();
  }, [category, availability, sort, page]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
    setPage(1);

    if (urlSearch !== search) {
      setIsLoading(true);
      const query = new URLSearchParams(searchParams.toString());
      getLawyers(`?${query.toString()}`)
        .then((response) => {
          setLawyers(response.lawyers || []);
          setTotalResults(response.total || 0);
          setTotalPages(response.totalPages || 1);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchFilteredLawyers();
  };

  return (
    <div className="space-y-8 bg-background text-foreground min-h-screen p-4 sm:p-8">
      {/* Title Header */}
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

      {/* Filter Bar */}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 rounded-xl border border-default-200 bg-background pl-11 pr-4 text-sm text-foreground outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <Select
          placeholder="All Categories"
          selectedKey={category}
          onSelectionChange={(k) => {
            setCategory(k as string);
            setPage(1);
          }}
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
          selectedKey={availability}
          onSelectionChange={(k) => {
            setAvailability(k as string);
            setPage(1);
          }}
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
          selectedKey={sort}
          onSelectionChange={(k) => {
            setSort(k as string);
            setPage(1);
          }}
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

      {/* Grid Stack */}
      <div className="w-full">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="space-y-5 rounded-2xl bg-content1 p-5 border border-default-100 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <Skeleton className="h-14 w-14 rounded-full bg-default-200" />
                  <Skeleton className="h-6 w-16 rounded-full bg-default-200" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/5 rounded-lg bg-default-200" />
                  <Skeleton className="h-3 w-4/5 rounded-lg bg-default-200" />
                </div>
              </div>
            ))}
          </div>
        ) : lawyers.length === 0 ? (
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
                  {/* Avatar, Name, and Status Badge */}
                  <div className="flex items-start justify-between w-full gap-2">
                    <div className="flex items-center gap-3 min-w-0">
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

                      {/* Name and Compact Category placed right next to Avatar */}
                      <div className="min-w-0 flex flex-col gap-0.5">
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

                  {/* Ratings and Separate Location Lines Layout */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    {/* Line 1: Review rating info */}
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="size-3.5 fill-amber-500" />
                      <span>4.9</span>
                      <span className="text-default-400 text-[11px] font-normal">
                        (218 reviews)
                      </span>
                    </div>
                    {/* Line 2: Independent Location display line */}
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

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <Pagination>
            <Pagination.Summary className="text-default-500 text-xs sm:text-sm font-semibold">
              Showing Page {page} of {totalPages} Results
            </Pagination.Summary>
            <Pagination.Content className="bg-content1 border border-default-200 rounded-xl overflow-hidden shadow-sm">
              <Pagination.Item>
                <Pagination.Previous
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={`px-3 py-1.5 text-xs flex items-center gap-1.5 font-bold transition-all ${
                    page === 1
                      ? "opacity-40 pointer-events-none text-default-300"
                      : "text-foreground hover:bg-default-100"
                  }`}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNode = idx + 1;
                return (
                  <Pagination.Item key={pageNode}>
                    <Pagination.Link
                      isActive={page === pageNode}
                      onClick={() => setPage(pageNode)}
                      className={`px-3.5 py-1.5 text-xs font-bold transition-all ${
                        page === pageNode
                          ? "bg-[#1D44B7] text-white rounded-lg shadow-sm"
                          : "text-default-500 hover:bg-default-100"
                      }`}
                    >
                      {pageNode}
                    </Pagination.Link>
                  </Pagination.Item>
                );
              })}

              <Pagination.Item>
                <Pagination.Next
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={`px-3 py-1.5 text-xs flex items-center gap-1.5 font-bold transition-all ${
                    page === totalPages
                      ? "opacity-40 pointer-events-none text-default-300"
                      : "text-foreground hover:bg-default-100"
                  }`}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}
