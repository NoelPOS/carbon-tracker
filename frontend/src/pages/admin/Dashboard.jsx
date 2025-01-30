import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [badges, setBadges] = useState([]);

  const stats = {
    totalUsers: 125,
    totalModerators: 125,
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    const instruction = formData.get("instruction");
    setTasks([...tasks, { title, instruction }]);
    form.reset();
  };

  const handleCreateBadge = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const description = formData.get("description");
    setBadges([...badges, { name, description }]);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </header>

        <main className="pb-8">
          {/* Stats Section */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900">
                Total Users
              </h2>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
              <Link
                to="/admin/users"
                className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Manage Users
              </Link>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900">
                Total Moderators
              </h2>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {stats.totalModerators}
              </p>
              <Link
                to="/admin/moderators"
                className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Manage Moderators
              </Link>
            </div>
          </div>

          {/* Admin Actions Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Admin Actions
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Create New Moderator */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Create New Moderator
                </h3>
                <form className="space-y-9">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    Create Moderator
                  </button>
                </form>
              </div>

              {/* Create New Task */}
              <div className="rounded-lg bg-white p-6 shadow ">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Create New Task
                </h3>
                <form onSubmit={handleCreateTask} className="space-y-12">
                  <input
                    type="text"
                    name="title"
                    placeholder="Article Title"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    name="instruction"
                    placeholder="Instruction"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 "
                  >
                    Create Task
                  </button>
                </form>
              </div>

              {/* Create New Badge */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Create New Badge
                </h3>
                <form onSubmit={handleCreateBadge} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Badge Name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Badge Description"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    Create Badge
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Assign Task to Moderator */}
          <div className="rounded-lg bg-white p-6 shadow my-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Assign Task to Moderator
            </h3>
            <form className="space-y-4">
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Select a moderator</option>
                <option value="mod1">Moderator 1</option>
                <option value="mod2">Moderator 2</option>
              </select>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Select a task</option>
                {tasks.map((task, index) => (
                  <option key={index} value={`task${index}`}>
                    {task.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Assign Task
              </button>
            </form>
          </div>

          {/* Provide Badge to User */}
          <div className="rounded-lg bg-white p-6 shadow my-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Provide Badge to User
            </h3>
            <form className="space-y-4">
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Select a user</option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
              </select>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Select a badge</option>
                {badges.map((badge, index) => (
                  <option key={index} value={`badge${index}`}>
                    {badge.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Assign Badge
              </button>
            </form>
          </div>

          {/* Display Created Tasks and Badges */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Created Tasks
              </h3>
              {tasks.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {tasks.map((task, index) => (
                    <li key={index} className="py-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {task.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {task.instruction}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tasks created yet.</p>
              )}
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Created Badges
              </h3>
              {badges.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {badges.map((badge, index) => (
                    <li key={index} className="py-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {badge.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {badge.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No badges created yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
