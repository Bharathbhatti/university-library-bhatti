import RoleDropdown from '@/components/RoleDropdown';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';

interface User {
  id: string;
  fullName: string;
  createdAt: string;
  role: string;
  universityId: string;
}

const Page = async () => {
  const result = await db.select().from(users);
  const usersData = JSON.parse(JSON.stringify(result)) as User[];

  return (
    <div className="overflow-hidden">
      <div className="inline-block min-w-full bg-white rounded-md">
        <h1 className="text-3xl font-bold p-5">All Users</h1>
        <div className="flex items-center justify-between gap-4 p-4 bg-light-300 text-gray-400 mt-5">
          <span className="w-1/4 font-semibold">Name</span>
          <span className="w-1/4 font-semibold">Date Joined</span>
          <span className="w-1/4 font-semibold">Role</span>
          <span className="w-1/4 font-semibold">University ID No</span>
        </div>

        <ul>
          {usersData.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-4 p-4 hover:bg-slate-200"
            >
              <span className="w-1/4">{user.fullName}</span>
              <span className="w-1/4">{new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}</span>
              <span className="w-1/4">
                <RoleDropdown currentRole={user.role} userId={user.id} />
              </span>
              <span className="w-1/4">{user.universityId}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
