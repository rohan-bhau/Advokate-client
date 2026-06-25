import React from "react";
import { getUsers } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/core";
import ManageUsersClient from "./ManageUsersClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ManageUsersPage() {
  const users = await getUsers();
  const currentAdmin = await getUserSession();

  return (
    <div className="w-full">
      <ManageUsersClient
        initialUsers={users || []}
        adminId={currentAdmin?.id || ""}
      />
    </div>
  );
}
