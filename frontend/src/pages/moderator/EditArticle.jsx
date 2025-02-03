import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch article data
    setArticle({
      id: "1",
      title: "How Renewable Energy is Changing the World",
      subtitle: "Discover the latest trends in renewable energy",
      description: "Content...",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg",
      status: "published",
      comments: [
        {
          id: "1",
          author: "John Doe",
          content: "Great article! I really enjoyed reading this.",
          timestamp: "about 2 hours ago",
        },
      ],
    });
  }, [id]);

  const handleRemoveComment = (commentId) => {
    setArticle({
      ...article,
      comments: article.comments.filter((comment) => comment.id !== commentId),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setArticle({ ...article, image: imageUrl });
    }
  };

  if (!article) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Update Article</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/moderator/articles")}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/moderator/articles")}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sub Title
          </label>
          <input
            type="text"
            value={article.subtitle}
            onChange={(e) =>
              setArticle({ ...article, subtitle: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={article.description}
            onChange={(e) =>
              setArticle({ ...article, description: e.target.value })
            }
            rows={6}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <div className="mt-1">
            <img
              src={article.image}
              alt=""
              className="h-48 w-full rounded-lg object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-500"
            />
          </div>
        </div>
      </form>

      {/* Comments Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Comments ({article.comments.length})
        </h2>
        <div className="space-y-4">
          {article.comments.map((comment) => (
            <div key={comment.id} className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveComment(comment.id)}
                className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
