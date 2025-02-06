import { useState, useEffect } from "react";
import Modal from "../../components/ui/RewardModal";

import axios from "axios";

// const users = [
//   {
//     id: "1",
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     streak: 15,
//     status: "active",
//   },
//   {
//     id: "2",
//     name: "Bob Smith",
//     email: "bob@gmail.com",
//     streak: 10,
//     status: "active",
//   },
// ];

// const badges = [
//   {
//     id: "1",
//     name: "Eco Warrior",
//     description: "For reducing carbon footprint significantly",
//   },
//   {
//     id: "2",
//     name: "Green Champion",
//     description: "For maintaining a long streak",
//   },
//   {
//     id: "3",
//     name: "Climate Hero",
//     description: "For outstanding contribution",
//   },
// ];

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

  const filteredUsers = userList.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReward = (user) => {
    setSelectedUser(user);
    setIsRewardModalOpen(true);
  };

  const handleSuspend = async (id) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      try {
        const res = await axios.put(
          "http://localhost:3000/api/admin/update/user",
          {
            user_id: id,
            status: "suspended",
          }
        );
        if (res.status === 200) {
          alert("User suspended successfully");
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/admin/delete/user/${id}`
        );
        if (res.status === 200) {
          alert("User deleted successfully");
          window.location.reload();
        } else {
          console.log(res);
        }
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter User's Name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div key={user.user_id} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
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
        ))}
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
