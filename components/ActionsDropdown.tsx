"use client";


import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ActionsDropdownProps {
    userId: number;
    status: string
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ userId, status }) => {
    const [newstatus, setnewstatus] = useState(status)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router=useRouter();

    const handleApprove = async () => {
        try {
            const response = await fetch("/api/approveAccount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            if (response.ok) {
                alert("Account approved successfully!");
                window.location.reload();
                setnewstatus(newstatus)
            } else {
                alert("Failed to approve account.");
            }
        } catch (error) {
            console.error("Error approving account:", error);
        }
    };

    const handleRevoke = async () => {
        try {
            const response = await fetch("/api/revokeAccount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            if (response.ok) {
                alert("Account revoked successfully!");
                window.location.reload();
                setnewstatus(newstatus)
            } else {
                alert("Failed to revoke account.");
            }
        } catch (error) {
            console.error("Error revoking account:", error);
        }
    };

    return (
        <div className="relative">
            <button
                className={`px-4 py-2 rounded text-white font-semibold hover:opacity-100 w-full ${newstatus === "PENDING" || newstatus === "REJECTED"
                        ? "bg-green-200 hover:bg-green-600 text-green-900"
                        : "bg-red-300 hover:bg-red-600 text-red-950"
                    }`}
                onClick={() => setDropdownVisible(!dropdownVisible)}
            >
                {newstatus === "PENDING" || newstatus === "REJECTED" ? (
                    <span onClick={handleApprove}>Approve Account</span>
                ) : (
                    <span onClick={handleRevoke}>Revoke Account</span>
                )}
            </button>
        </div>
    );
};

export default ActionsDropdown;
