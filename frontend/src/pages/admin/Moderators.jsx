import { useState } from "react";
import Modal from "../../components/ui/AssignModal";

const moderators = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    image: "https://randomuser.me/api/port",
    assignedTasks: 3,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@gmail.com",
    image: "/profile.jpg",
    assignedTasks: 5,
  },
];

export default function Moderators() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedModerator, setSelectedModerator] = useState(null);
  const [assignForm, setAssignForm] = useState({
    title: "",
    instruction: "",
  });

  const filteredModerators = moderators.filter((moderator) =>
    moderator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = (moderator) => {
    setSelectedModerator(moderator);
    setIsAssignModalOpen(true);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    console.log("Assigning task to:", selectedModerator?.name, assignForm);
    setIsAssignModalOpen(false);
    setAssignForm({ title: "", instruction: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Manage Moderators</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Moderator's Name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredModerators.map((moderator) => (
          <div
            key={moderator.id}
            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm"
          >
            <img
              src={moderator.image}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">Name: {moderator.name}</h3>
              <p className="text-sm text-gray-600">{moderator.email}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAssign(moderator)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Assign
                </button>
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign Task to Moderator"
      >
        <form onSubmit={handleSubmitAssignment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selected Moderator
            </label>
            <input
              type="text"
              value={selectedModerator?.name || ""}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Article Title
            </label>
            <input
              type="text"
              value={assignForm.title}
              onChange={(e) =>
                setAssignForm({ ...assignForm, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instruction
            </label>
            <textarea
              value={assignForm.instruction}
              onChange={(e) =>
                setAssignForm({ ...assignForm, instruction: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Assign
          </button>
        </form>
      </Modal>
    </div>
  );
}
