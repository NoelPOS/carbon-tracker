import { useState } from "react";

const initialQuestions = [
  {
    id: "1",
    question: "What did you eat for breakfast today?",
    options: [
      { text: "Dairy", carbonAmount: 0.25 },
      { text: "Meat", carbonAmount: 0.5 },
      { text: "Vegetable", carbonAmount: 0.25 },
    ],
  },
];

export default function Questions() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [{ text: "", carbonAmount: 0 }],
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { text: "", carbonAmount: 0 }],
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = {
        ...newQuestion,
        id: questions[editingIndex].id,
      };
      setQuestions(updatedQuestions);
      setEditingIndex(null);
    } else {
      setQuestions([
        ...questions,
        { ...newQuestion, id: Date.now().toString() },
      ]);
    }
    setNewQuestion({ question: "", options: [{ text: "", carbonAmount: 0 }] });
  };

  const handleEdit = (index) => {
    setNewQuestion(questions[index]);
    setEditingIndex(index);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Create/Edit Question</h2>
        <form className="mt-6 space-y-6" onSubmit={handleCreate}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <input
              type="text"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter question"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Answers
            </label>
            <div className="mt-2 space-y-4">
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index].text = e.target.value;
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                    className="flex-grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Option"
                  />
                  <input
                    type="number"
                    value={option.carbonAmount}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index].carbonAmount = parseFloat(
                        e.target.value
                      );
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                    className="w-24 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Amount"
                    step="0.01"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addOption}
              className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              <span className="mr-1">+</span> more option
            </button>
          </div>

          <button
            type="submit"
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            {editingIndex !== null ? "Update" : "Create"}
          </button>
        </form>
      </div>

      <div className="space-y-6 mt-5">
        <h2 className="text-xl font-semibold">Question List</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold">{question.question}</h3>
              <div className="mt-4 space-y-2">
                {question.options.map((option, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{option.text}</span>
                    <span>{option.carbonAmount}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleEdit(index)}
                className="mt-4 rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
