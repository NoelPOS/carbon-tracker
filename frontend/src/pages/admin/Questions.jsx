import { useState, useEffect } from 'react'
import axios from 'axios'

// const initialQuestions = [
//   {
//     id: "1",
//     question: "What did you eat for breakfast today?",
//     options: [
//       { text: "Dairy", carbonAmount: 0.25 },
//       { text: "Meat", carbonAmount: 0.5 },
//       { text: "Vegetable", carbonAmount: 0.25 },
//     ],
//   },
// ];

// Table Schema for question and option

// CREATE TABLE Question (
//     question_id SERIAL PRIMARY KEY,
//     question_title TEXT NOT NULL,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Option Table
// CREATE TABLE Option (
//     option_id SERIAL PRIMARY KEY,
//     question_id INT REFERENCES Question(question_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     option_name VARCHAR(255) NOT NULL,
//     carbon_value DECIMAL(10,2) NOT NULL
// );

export default function Questions() {
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: [{ text: '', carbonAmount: 0 }],
  })
  const [editingIndex, setEditingIndex] = useState(null)

  const fetchQuestionsAndOptions = async () => {
    const res = await axios.get(`http://localhost:3000/api/admin/questions`)
    const questions = res.data

    const questionsWithOption = await Promise.all(
      questions.map(async (question) => {
        const res = await axios.get(
          `http://localhost:3000/api/admin/options/${question.question_id}`
        )
        return { ...question, options: res.data }
      })
    )
    console.log(questionsWithOption)

    setQuestions(questionsWithOption)
  }

  useEffect(() => {
    fetchQuestionsAndOptions()
  }, [])

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { text: '', carbonAmount: 0 }],
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const admin = await localStorage.getItem('admin')
    const admin_id = JSON.parse(admin).admin_id
    console.log(admin_id)
    // create new question first then create options
    if (editingIndex == null) {
      const res = await axios.post(
        `http://localhost:3000/api/admin/questions/create`,
        {
          question: newQuestion.question,
          admin_id,
        }
      )
      const question_id = res.data.question_id

      newQuestion.options.forEach(async (option) => {
        await axios.post(`http://localhost:3000/api/admin/options/create`, {
          question_id,
          option_name: option.text,
          carbon_value: option.carbonAmount,
        })
      })
      fetchQuestionsAndOptions()
    } else {
      // update question
      await axios.put(
        `http://localhost:3000/api/admin/questions/update/${questions[editingIndex].question_id}`,
        {
          question: newQuestion.question_title,
        }
      )
      // update all the options
      newQuestion.options.forEach(async (option, index) => {
        if (questions[editingIndex].options[index]) {
          await axios.put(
            `http://localhost:3000/api/admin/options/update/${questions[editingIndex].options[index].option_id}`,
            {
              option_name: option.text,
              carbon_value: option.carbonAmount,
            }
          )
        } else {
          await axios.post(`http://localhost:3000/api/admin/options/create`, {
            question_id: questions[editingIndex].question_id,
            option_name: option.option_name,
            carbon_value: option.carbon_value,
          })
        }
      })
      setNewQuestion({
        question: '',
        options: [{ question_title: '', carbon_value: 0 }],
      })
      setEditingIndex(null)
    }
    setNewQuestion({
      question_title: '',
      options: [{ question_title: '', carbon_value: 0 }],
    })
  }

  const handleEdit = (index) => {
    setNewQuestion(questions[index])
    setEditingIndex(index)
  }

  const handleDeleteQuestion = async (question_id) => {
    await axios.delete(
      `http://localhost:3000/api/admin/questions/delete/${question_id}`
    )
    fetchQuestionsAndOptions()
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold'>Create/Edit Question</h2>
        <form className='mt-6 space-y-6' onSubmit={handleCreate}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Question
            </label>
            <input
              type='text'
              value={newQuestion.question_title}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  question_title: e.target.value,
                })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              placeholder='Enter question'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Answers
            </label>
            <div className='mt-2 space-y-4'>
              {newQuestion.options.map((option, index) => (
                <div key={index} className='flex gap-4'>
                  <input
                    type='text'
                    value={option.option_name}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options]
                      newOptions[index].option_name = e.target.value
                      setNewQuestion({ ...newQuestion, options: newOptions })
                    }}
                    className='flex-grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    placeholder='Option'
                  />
                  <input
                    type='number'
                    value={option.carbon_value}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options]
                      newOptions[index].carbon_value = parseFloat(
                        e.target.value
                      )
                      setNewQuestion({ ...newQuestion, options: newOptions })
                    }}
                    className='w-24 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    placeholder='Amount'
                    step='0.01'
                  />
                </div>
              ))}
            </div>
            <button
              type='button'
              onClick={addOption}
              className='mt-4 flex items-center text-sm text-blue-600 hover:text-blue-500'
            >
              <span className='mr-1'>+</span> more option
            </button>
          </div>

          <button
            type='submit'
            className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
          >
            {editingIndex !== null ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      <div className='space-y-6 mt-5'>
        <h2 className='text-xl font-semibold'>Question List</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div
                key={question.id}
                className='rounded-lg bg-white p-6 shadow-sm'
              >
                <h3 className='font-semibold'>{question.question_title}</h3>
                <div className='mt-4 space-y-2'>
                  {question.options ? (
                    question.options.map((option, index) => (
                      <div key={index} className='flex gap-4'>
                        <span>{option.option_name}</span>
                        <span>{option.carbon_value}</span>
                      </div>
                    ))
                  ) : (
                    <span>No options</span>
                  )}
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <button
                    onClick={() => handleEdit(index)}
                    className='mt-4 rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.question_id)}
                    className='mt-4 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <span>No questions</span>
          )}
        </div>
      </div>
    </div>
  )
}
