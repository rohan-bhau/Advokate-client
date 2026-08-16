"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiBriefcase, FiCheckCircle, FiAward, FiClock } from "react-icons/fi";

export default function ClientDashboardClientView({ data }: { data: any }) {
  const { metrics, recentHires } = data;
  const router = useRouter();

  const statCards = [
    {
      title: "Total Hires",
      value: metrics.totalHires,
      icon: <FiBriefcase className="size-4" />,
      accent: "bg-brand-100/20 text-brand-500 dark:text-brand-600",
    },
    {
      title: "Accepted",
      value: metrics.acceptedCases,
      icon: <FiCheckCircle className="size-4" />,
      accent: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Completed",
      value: metrics.completedCases,
      icon: <FiAward className="size-4" />,
      accent: "bg-gold-500/15 text-gold-500",
    },
    {
      title: "Pending",
      value: metrics.pendingRequests,
      icon: <FiClock className="size-4" />,
      accent: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.title} className="card-surface rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted">{card.title}</p>
                <p className="text-3xl font-extrabold text-foreground mt-2">
                  {card.value}
                </p>
              </div>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}
              >
                {card.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-surface p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Recent Hiring Requests
          </h2>
          <Link href="/dashboard/client/transactions">
            <Button
              size="sm"
              variant="outline"
              className="text-brand-500 dark:text-brand-600 font-bold text-xs rounded-lg"
            >
              View All Transactions
            </Button>
          </Link>
        </div>

        <Table
          aria-label="Client recent hiring table"
          className="border-none shadow-none"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader className="bg-content2 text-xs">
                  Lawyer
                </Table.Column>
                <Table.Column className="bg-content2 text-xs">
                  Service
                </Table.Column>
                <Table.Column className="bg-content2 text-xs">
                  Date
                </Table.Column>
                <Table.Column className="bg-content2 text-xs">
                  Status
                </Table.Column>
                <Table.Column className="bg-content2 text-xs text-center">
                  Action
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {recentHires.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      className="text-center text-muted py-6"
                      colSpan={5}
                    >
                      You haven't hired any lawyers yet.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  recentHires.map((hire: any) => (
                    <Table.Row
                      key={hire._id}
                      className="border-b border-border"
                    >
                      <Table.Cell className="text-xs font-semibold text-foreground">
                        {hire.lawyerName}
                      </Table.Cell>
                      <Table.Cell className="text-xs text-muted font-medium">
                        {hire.specialization || "Legal Brief"}
                      </Table.Cell>
                      <Table.Cell className="text-xs text-muted">
                        {new Date(hire.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            hire.status === "accepted"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : hire.status === "pending"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-danger-500/10 text-danger"
                          }`}
                        >
                          {hire.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push("/dashboard/client/hiring-history")
                          }
                          className="h-7 text-[11px] font-bold rounded-lg bg-content2 text-foreground"
                        >
                          View
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
