"use client";

import { useState } from "react";

interface RoleDropdownProps {
  currentRole: string;
  userId: string;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({ currentRole, userId }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const updateRole = async (newRole: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/updateRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const data = await response.json();
      
      setRole(newRole); 
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    } finally {
      setLoading(false);
      setDropdownVisible(false);
    }
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
