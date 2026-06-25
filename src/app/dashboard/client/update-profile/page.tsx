import React from "react";
import UpdateForm from "./components/UpdateForm";

export const metadata = {
  title: "Update Profile Management",
};

export default async function UpdateProfilePage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 flex flex-col justify-center">
      {/* Client component wrapper which contains modal structure */}
      <UpdateForm />
    </div>
  );
}
