"use client";

import React from "react";
import { Table, Avatar } from "@heroui/react";
import { FiUsers, FiBriefcase, FiUserCheck, FiDollarSign } from "react-icons/fi";
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
            icon: <FiUsers className="size-4" />,
            accent: "bg-brand-100/20 text-brand-500 dark:text-brand-600",
          },
          {
            title: "Total Lawyers",
            value: data.cards.totalLawyers,
            change: "+8% from last month",
            icon: <FiUserCheck className="size-4" />,
            accent: "bg-emerald-500/10 text-emerald-500",
          },
          {
            title: "Total Hires",
            value: data.cards.totalHires,
            change: "+15% from last month",
            icon: <FiBriefcase className="size-4" />,
            accent: "bg-amber-500/10 text-amber-500",
          },
          {
            title: "Total Revenue",
            value: `$${data.cards.totalRevenue.toLocaleString()}`,
            change: "+10% from last month",
            icon: <FiDollarSign className="size-4" />,
            accent: "bg-gold-500/15 text-gold-500",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="card-surface rounded-2xl p-5 flex items-start justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs text-muted font-medium">{card.title}</p>
              <h3 className="text-2xl font-extrabold text-foreground">
                {card.value || "0"}
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold">
                {card.change}
              </p>
            </div>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}
            >
              {card.icon}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 card-surface p-6 rounded-2xl space-y-4">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Recent Activities
            </h2>
            <p className="text-[11px] text-muted">
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
                    className="bg-content2 text-muted font-bold text-xs py-2.5"
                  >
                    User / Target
                  </Table.Column>
                  <Table.Column className="bg-content2 text-muted font-bold text-xs py-2.5">
                    Activity
                  </Table.Column>
                  <Table.Column className="bg-content2 text-muted font-bold text-xs py-2.5">
                    Date
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {data.recentActivities.length === 0 ? (
                    <Table.Row>
                      <Table.Cell
                        className="text-center text-muted py-8 text-xs"
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
                        ? "bg-gold-500/10 text-gold-600 dark:text-gold-400"
                        : "bg-brand-100/20 text-brand-500 dark:text-brand-600";

                      return (
                        <Table.Row
                          key={i}
                          className="border-b border-border hover:bg-content2/60 transition-all duration-150"
                        >
                          <Table.Cell>
                            <div className="flex items-center gap-2.5 py-1">
                              <Avatar className="w-7 h-7 rounded-full text-[10px] font-bold bg-content2 text-muted border border-border">
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
                              <span className="text-[10px] text-muted font-medium truncate max-w-[140px]">
                                {act.details}
                              </span>
                            </div>
                          </Table.Cell>

                          <Table.Cell className="text-[10px] text-muted font-medium whitespace-nowrap">
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

        <div className="lg:col-span-7 card-surface p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Revenue Overview
            </h2>
            <p className="text-[11px] text-muted mb-4">
              Real-time financial synchronization flow map.
            </p>
          </div>
          <DashboardChartsClient chartData={data.revenueOverview} />
        </div>
      </div>
    </div>
  );
}
