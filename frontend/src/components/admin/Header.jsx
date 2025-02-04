import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-gray-100 text-gray-900"
      : "text-gray-600 hover:bg-gray-50";
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/admin" className="flex items-center">
          <span className="text-xl font-semibold">🌱 Carbon Tracker</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/admin"
            className={`rounded-md px-3 py-2 text-sm ${isActive("/admin")}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/questions"
            className={`rounded-md px-3 py-2 text-sm ${isActive("/questions")}`}
          >
            Questions
          </Link>
          <Link
            to="/admin/articles"
            className={`rounded-md px-3 py-2 text-sm ${isActive("/articles")}`}
          >
            Articles
          </Link>
          <Link
            to="/admin/users"
            className={`rounded-md px-3 py-2 text-sm ${isActive("/users")}`}
          >
            Users
          </Link>
          <Link
            to="/admin/moderators"
            className={`rounded-md px-3 py-2 text-sm ${isActive(
              "/moderators"
            )}`}
          >
            Moderators
          </Link>
          <button className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Link to="/">Log Out</Link>
          </button>
        </nav>
      </div>
    </header>
  );
}
