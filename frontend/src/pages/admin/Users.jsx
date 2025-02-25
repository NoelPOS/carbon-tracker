import { useState, useEffect } from "react";
import Modal from "../../components/ui/RewardModal";

import axios from "axios";

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [badgeList, setBadgeList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await axios.get("http://localhost:3000/api/admin/users");
        setUserList(res.data);
      };

      const fetchBadges = async () => {
        const res = await axios.get("http://localhost:3000/api/admin/badges");
        setBadgeList(res.data);
      };

      fetchBadges();
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleReward = (user) => {
    setSelectedUser(user);
    setIsRewardModalOpen(true);
  };

  const handleSuspend = async (id) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      try {
        await axios.put("http://localhost:3000/api/admin/update/user", {
          user_id: id,
          status: "suspended",
          admin_id: JSON.parse(localStorage.getItem("admin")).admin_id,
        });
        alert("User suspended successfully");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/delete/user/${id}`);
        alert("User deleted successfully");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmitReward = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const badgeId = formData.get("badge");
    try {
      const res = await axios.post(
        `http://localhost:3000/api/admin/assign/badge`,
        {
          user_id: selectedUser.user_id,
          badge_id: badgeId,
        }
      );
      if (res.status === 201) {
        alert("Badge assigned successfully");
        setIsRewardModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/users?search=${searchQuery}`
      );
      setUserList(res.data);
      setSearchQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>

      <div className="mb-6">
        <form
          className="flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter Article Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userList.length > 0 ? (
          userList.map((user) => (
            <div
              key={user.user_id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${user.fullname}`}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">Name: {user.fullname}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="mt-2">Streak: {user.streak_day} days</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Status: {user.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleReward(user)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Reward
                </button>
                <button
                  onClick={() => handleSuspend(user.user_id)}
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-lg bg-white p-12 shadow-sm text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No users match your search criteria."
                : "There are no users registered in the system yet."}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        title="Provide Badge to User"
      >
        <form onSubmit={handleSubmitReward} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selected User
            </label>
            <input
              type="text"
              value={selectedUser?.fullname || ""}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Badge
            </label>
            <select
              name="badge"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select a badge</option>

              {badgeList.map((badge) => (
                <option key={badge.badge_id} value={badge.badge_id}>
                  {badge.badge_desc}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Assign Badge
          </button>
        </form>
      </Modal>
    </div>
  );
}
