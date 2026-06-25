"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClientDashboardClientView({ data }: { data: any }) {
  const { metrics, recentHires } = data;
    const router = useRouter();
    console.log(data)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Hires", value: metrics.totalHires },
          { title: "Accepted", value: metrics.acceptedCases },
          { title: "Completed", value: metrics.completedCases },
          { title: "Pending", value: metrics.pendingRequests },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-5 bg-content1 rounded-2xl border border-default-100 shadow-sm"
          >
            <p className="text-xs text-default-400 font-medium">{card.title}</p>
            <h3 className="text-2xl font-black text-foreground mt-1">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="p-6 bg-content1 rounded-2xl border border-default-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Recent Hiring Requests
          </h2>
          <Link href="/dashboard/client/transactions">
            <Button
              size="sm"
              variant="outline"
              className="text-primary font-bold text-xs"
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
                <Table.Column isRowHeader className="bg-default-50 text-xs">
                  Lawyer
                </Table.Column>
                <Table.Column className="bg-default-50 text-xs">
                  Service
                </Table.Column>
                <Table.Column className="bg-default-50 text-xs">
                  Date
                </Table.Column>
                <Table.Column className="bg-default-50 text-xs">
                  Status
                </Table.Column>
                <Table.Column className="bg-default-50 text-xs text-center">
                  Action
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {recentHires.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      className="text-center text-default-400 py-6"
                      colSpan={5}
                    >
                      You haven't hired any lawyers yet.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  recentHires.map((hire: any) => (
                    <Table.Row
                      key={hire._id}
                      className="border-b border-default-50"
                    >
                      <Table.Cell className="text-xs font-semibold text-foreground">
                        {hire.lawyerName}
                      </Table.Cell>
                      <Table.Cell className="text-xs text-default-500 font-medium">
                        {hire.specialization || "Legal Brief"}
                      </Table.Cell>
                      <Table.Cell className="text-xs text-default-400">
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
                              ? "bg-emerald-50 text-emerald-600"
                              : hire.status === "pending"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-danger-50 text-danger"
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
                          className="h-7 text-[11px] font-bold rounded-lg bg-default-100"
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
