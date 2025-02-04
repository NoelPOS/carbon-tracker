import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ArticleDetail() {
  const articles = [
    {
      id: 1,
      title: "How Renewable Energy is Changing the World",
      subtitle:
        "Discover the latest trends in renewable energy and how they are shaping our future.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg",
      content:
        "Renewable energy is transforming the global landscape, offering sustainable solutions to meet our energy demands. The industry has seen exponential growth, driven by technological advancements and increasing awareness of the environmental impact of fossil fuels. As we embrace solar, wind, and other renewable sources, we are paving the way for a cleaner, greener future. This shift is not only reducing carbon emissions but also creating jobs, fostering innovation, and driving economic growth. Join us as we explore the impact of renewable energy and its role in shaping a sustainable world for generations to come.",
      comments: [
        {
          id: 1,
          author: "John Doe",
          content: "Great article! I really enjoyed reading this.",
          timestamp: "about 2 hours ago",
          replies: [],
        },
      ],
    },
    {
      id: 2,
      title: "Carbon Offsetting: A Comprehensive Guide",
      subtitle:
        "Learn how carbon offsetting works and how you can contribute to reducing emissions.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/3/JE/QQ/EB/28817984/poly-crystalline-solar-power-panel-500x500.jpg",
      content:
        "Renewable energy is transforming the global landscape, offering sustainable solutions to meet our energy demands. The industry has seen exponential growth, driven by technological advancements and increasing awareness of the environmental impact of fossil fuels. As we embrace solar, wind, and other renewable sources, we are paving the way for a cleaner, greener future. This shift is not only reducing carbon emissions but also creating jobs, fostering innovation, and driving economic growth. Join us as we explore the impact of renewable energy and its role in shaping a sustainable world for generations to come.",
      comments: [
        {
          id: 1,
          author: "John Doe",
          content: "Great article! I really enjoyed reading this.",
          timestamp: "about 2 hours ago",
          replies: [],
        },
      ],
    },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === Number(id));
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(article ? article.comments : []);
  const [replyContent, setReplyContent] = useState({});

  if (!article) {
    navigate("/articles");
    return null;
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "Current User",
      content: newComment,
      timestamp: "just now",
      replies: [],
    };

    setComments((prevComments) => [...prevComments, comment]);
    setNewComment("");
  };

  const handleReply = (commentId) => {
    if (!replyContent[commentId]?.trim()) return;

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: comment.replies.length + 1,
                author: "Current User",
                content: replyContent[commentId],
                timestamp: "just now",
              },
            ],
          }
        : comment
    );

    setComments(updatedComments);
    setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto">
        <h1 className="text-center text-4xl font-bold">{article.title}</h1>
        <p className="text-center text-gray-600">{article.subtitle}</p>

        <img
          src={article.image}
          alt={article.title}
          className="my-8 w-full rounded-lg object-cover"
        />

        <p className="text-gray-800">{article.content}</p>
      </article>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>

        <form onSubmit={handleSubmitComment} className="mt-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="What are your thoughts?"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200"
            >
              Comment
            </button>
          </div>
        </form>

        <div className="mt-8 space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200" />
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-gray-800">{comment.content}</p>
                <button
                  onClick={() =>
                    setReplyContent((prev) => ({
                      ...prev,
                      [comment.id]: prev[comment.id] ? "" : "",
                    }))
                  }
                  className="mt-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  Reply
                </button>

                {replyContent[comment.id] !== undefined && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyContent[comment.id] || ""}
                      onChange={(e) =>
                        setReplyContent((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                      className="flex-grow rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                    >
                      Send
                    </button>
                  </div>
                )}

                {comment.replies.map((reply) => (
                  <div key={reply.id} className="ml-6 mt-2 border-l-2 pl-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{reply.author}</span>
                      <span className="text-sm text-gray-500">
                        {reply.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-800">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
