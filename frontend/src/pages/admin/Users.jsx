import { useState } from "react";
import Modal from "../../components/ui/RewardModal";

const users = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    streak: 15,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@gmail.com",
    streak: 10,
    status: "active",
  },
];

const badges = [
  {
    id: "1",
    name: "Eco Warrior",
    description: "For reducing carbon footprint significantly",
  },
  {
    id: "2",
    name: "Green Champion",
    description: "For maintaining a long streak",
  },
  {
    id: "3",
    name: "Climate Hero",
    description: "For outstanding contribution",
  },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rewardForm, setRewardForm] = useState({
    badge: "",
    message: "",
  });
  const [userList, setUserList] = useState(users);

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReward = (user) => {
    setSelectedUser(user);
    setIsRewardModalOpen(true);
  };

  const handleSuspend = (id) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: "suspended" } : user
        )
      );
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  const handleSubmitReward = (e) => {
    e.preventDefault();
    console.log("Rewarding user:", selectedUser?.name, rewardForm);
    setIsRewardModalOpen(false);
    setRewardForm({ badge: "", message: "" });
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
          <div key={user.id} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">Name: {user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-2">Streak: {user.streak} days</p>
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
                onClick={() => handleSuspend(user.id)}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                Suspend
              </button>
              <button
                onClick={() => handleDelete(user.id)}
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
              value={selectedUser?.name || ""}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Badge
            </label>
            <select
              value={rewardForm.badge}
              onChange={(e) =>
                setRewardForm({ ...rewardForm, badge: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select a badge</option>
              {badges.map((badge) => (
                <option key={badge.id} value={badge.id}>
                  {badge.name} - {badge.description}
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
