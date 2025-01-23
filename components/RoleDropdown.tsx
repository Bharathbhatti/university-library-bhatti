"use client";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { useState } from "react";

interface RoleDropdownProps {
  currentRole: string;
  userId: number;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({ currentRole, userId }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [role, setRole] = useState(currentRole);

  const updateRole = async (newRole: string) => {
    console.log("role=",newRole)
    
    

    setRole(newRole); // Update role locally
    setDropdownVisible(false); // Close dropdown
  };

  return (
    <div className="relative">
      <p
        className="cursor-pointer bg-pink-200 text-pink-700 p-3 rounded-3xl w-[78px] text-center"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {role}
      </p>
      {dropdownVisible && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-md shadow-lg w-32 z-10">
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => updateRole("USER")}
          >
            User
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => updateRole("ADMIN")}
          >
            Admin
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
