"use client";

import React from "react";
import { Table, Avatar } from "@heroui/react";
import DashboardChartsClient from "./DashboardChartsClient";

interface Props {
  data: {
    cards: {
      totalUsers: number;
      totalLawyers: number;
      totalHires: number;
      totalRevenue: number;
    };
    recentActivities: any[];
    revenueOverview: any[];
  };
}

export default function DashboardClientView({ data }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Users",
            value: data.cards.totalUsers,
            change: "+12% from last month",
          },
          {
            title: "Total Lawyers",
            value: data.cards.totalLawyers,
            change: "+8% from last month",
          },
          {
            title: "Total Hires",
            value: data.cards.totalHires,
            change: "+15% from last month",
          },
          {
            title: "Total Revenue",
            value: `$${data.cards.totalRevenue.toLocaleString()}`,
            change: "+10% from last month",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-5 bg-content1 rounded-2xl border border-default-100 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs text-default-400 font-medium">
                {card.title}
              </p>
              <h3 className="text-2xl font-black text-foreground">
                {card.value || "0"}
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold">
                {card.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 p-6 bg-content1 rounded-2xl border border-default-100 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Recent Activities
            </h2>
            <p className="text-[11px] text-default-400">
              Latest global ledger logs and practitioner activities.
            </p>
          </div>

          <Table
            aria-label="Recent system logs table"
            className="border-none shadow-none"
          >
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    className="bg-default-50 text-default-600 font-bold text-xs py-2.5"
                  >
                    User / Target
                  </Table.Column>
                  <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-2.5">
                    Activity
                  </Table.Column>
                  <Table.Column className="bg-default-50 text-default-600 font-bold text-xs py-2.5">
                    Date
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {data.recentActivities.length === 0 ? (
                    <Table.Row>
                      <Table.Cell
                        className="text-center text-default-400 py-8 text-xs"
                        colSpan={3}
                      >
                        No activities logged yet.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    data.recentActivities.map((act: any, i: number) => {
                      // ইউজারের ইমেইল এক্সট্রাক্ট করা (Details ফিল্ড থেকে ইমেইল বের করার সেফ ট্রিক)
                      const emailMatch = act.details.match(
                        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                      );
                      const displayUser = emailMatch
                        ? emailMatch[0]
                        : "System Log";
                      const initials = displayUser
                        .substring(0, 2)
                        .toUpperCase();

                      const isPayment = act.activity.includes("Payment");
                      const badgeClass = isPayment
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20"
                        : "bg-blue-50 text-blue-600 dark:bg-blue-950/20";

                      return (
                        <Table.Row
                          key={i}
                          className="border-b border-default-50 hover:bg-default-50/50 transition-all duration-150"
                        >
                          <Table.Cell>
                            <div className="flex items-center gap-2.5 py-1">
                              <Avatar className="w-7 h-7 rounded-full text-[10px] font-bold bg-default-100 text-default-600 border border-default-200">
                                <Avatar.Fallback>{initials}</Avatar.Fallback>
                              </Avatar>
                              <span className="text-xs font-semibold text-foreground max-w-[120px] truncate select-all">
                                {displayUser}
                              </span>
                            </div>
                          </Table.Cell>

                          <Table.Cell>
                            <div className="flex flex-col gap-0.5">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md w-max ${badgeClass}`}
                              >
                                {act.activity}
                              </span>
                              <span className="text-[10px] text-default-400 font-medium truncate max-w-[140px]">
                                {act.details}
                              </span>
                            </div>
                          </Table.Cell>

                          <Table.Cell className="text-[10px] text-default-500 font-medium whitespace-nowrap">
                            {new Date(act.date).toLocaleDateString("en-US", {
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
        </div>

        <div className="lg:col-span-7 p-6 bg-content1 rounded-2xl border border-default-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Revenue Overview
            </h2>
            <p className="text-[11px] text-default-400 mb-4">
              Real-time financial synchronization flow map.
            </p>
          </div>
          <DashboardChartsClient chartData={data.revenueOverview} />
        </div>
      </div>
    </div>
  );
}
