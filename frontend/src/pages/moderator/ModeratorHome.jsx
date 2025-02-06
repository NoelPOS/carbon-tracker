import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModeratorHome() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("moderator")).moderator_id;
        const { data } = await axios.post(
          `http://localhost:3000/api/moderator/tasks`,
          {
            moderator_id: id,
          }
        );
        console.log(data);
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Tasks</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-16 items-center justify-center rounded-md bg-gray-500 text-white">
                TASK {task.task_id}
              </div>
              <div>
                <h3 className="font-semibold">{task.task_title}</h3>
                <p className="text-sm text-gray-600">{task.task_desc}</p>
              </div>
            </div>
            <Link
              to={`/moderator/articles/create/${task.task_id}`}
              className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            >
              Do it now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
