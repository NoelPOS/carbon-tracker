import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/articles`);
        console.log("Articles:", res.data);
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        onsole.error("Error fetching articles:", err);
      }
    };
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/articles?search=${searchQuery}`
      );
      console.log("Articles:", res.data);
      // only put three articles in the array
      setArticles(res.data.slice(0, 3));
      setSearchQuery("");
    } catch (err) {
      console.error("Error searching articles:", err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
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

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Articles Available
          </h3>
          <p className="text-gray-500">
            There are currently no articles to display. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.article_id}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <img
                src={article.img_url}
                alt=""
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{article.title}</h3>
                <Link
                  to={`/user/articles/${article.article_id}`}
                  className="mt-4 inline-block rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                >
                  DETAILS
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
