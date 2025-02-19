import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apple from '../../assets/apple.png'
import axios from 'axios'

export default function Survey() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('start')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [seeMore, setSeeMore] = useState(false)
  const [questions, setQuestions] = useState([])
  const [averageCarbonResult, setAverageCarbonResult] = useState(0)
  const [previousRecords, setPreviousRecords] = useState([])

  useEffect(() => {
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
      setQuestions(questionsWithOption)
    }

    const fetchPreviousRecords = async () => {
      const user_id = JSON.parse(localStorage.getItem('users')).user_id
      const res = await axios.get(
        `http://localhost:3000/api/users/records/${user_id}`
      )
      console.log(res.data)
      setPreviousRecords(res.data)
    }

    fetchPreviousRecords()
    fetchQuestionsAndOptions()
  }, [])

  const handleStartSurvey = async () => {
    const last_survey = JSON.parse(localStorage.getItem('users')).last_survey
    const today = new Date().toISOString().split('T')[0]
    console.log(last_survey, today)

    if (
      last_survey !== today &&
      new Date(today) - new Date(last_survey) >= 86400000 &&
      new Date(today) - new Date(last_survey) < 172800000
    ) {
      setCurrentStep('questions')
    } else if (
      last_survey !== today &&
      new Date(today) - new Date(last_survey) >= 172800000
    ) {
      setCurrentStep('questions')
    } else {
      alert('You have already taken the survey today!')
    }
  }

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = selectedAnswer
      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setCurrentStep('complete')
        const carbonResults = newAnswers.map((answer) => Number(answer))
        const sum = carbonResults.reduce((acc, curr) => acc + curr, 0)
        const average = (sum / carbonResults.length).toFixed(2)
        setAverageCarbonResult(average)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(answers[currentQuestionIndex - 1] || null)
    }
  }

  const handleSaveRecord = async () => {
    const user_id = JSON.parse(localStorage.getItem('users')).user_id
    const last_survey = JSON.parse(localStorage.getItem('users')).last_survey
    const today = new Date().toISOString().split('T')[0]
    console.log(last_survey, today)
    if (
      last_survey !== today &&
      new Date(today) - new Date(last_survey) >= 86400000 &&
      new Date(today) - new Date(last_survey) < 172800000
    ) {
      const res = await axios.put(
        `http://localhost:3000/api/users/streakupdate/${user_id}`,
        {
          last_survey: today,
          streak: JSON.parse(localStorage.getItem('users')).streak_day + 1,
        }
      )
      localStorage.setItem('users', JSON.stringify(res.data))
      await axios
        .post(`http://localhost:3000/api/users/save-record`, {
          user_id,
          carbon_amount: averageCarbonResult,
        })
        .then(() => {
          alert('Record saved successfully!')
          navigate('/dashboard')
        })
    } else if (
      last_survey !== today &&
      new Date(today) - new Date(last_survey) >= 172800000
    ) {
      const res = await axios.put(
        `http://localhost:3000/api/users/streakupdate/${user_id}`,
        {
          last_survey: today,
          streak: 1,
        }
      )
      localStorage.setItem('users', JSON.stringify(res.data))
      await axios
        .post(`http://localhost:3000/api/users/save-record`, {
          user_id,
          carbon_amount: averageCarbonResult,
        })
        .then(() => {
          alert('Record saved successfully!')
          navigate('/dashboard')
        })
    } else {
      alert('You have already taken the survey today!')
      navigate('/user')
    }
  }

  const handleToggleSeeMore = () => {
    setSeeMore((prev) => !prev)
  }

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  const displayedRecords = seeMore
    ? previousRecords
    : previousRecords.slice(0, 3)

  if (currentStep === 'start') {
    return (
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mb-8 rounded-lg bg-gray-100 p-6'>
          <h2 className='mb-4 text-lg font-semibold'>Your Previous Records</h2>
          <div className='overflow-hidden rounded-lg bg-white'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                    Record Number
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedRecords.map((record) => (
                  <tr key={record.record_id} className='border-b'>
                    <td className='px-6 py-4'>{record.record_id}</td>
                    <td className='px-6 py-4'>
                      {formatDate(record.survey_date)}
                    </td>
                    <td className='px-6 py-4'>{record.carbon_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleToggleSeeMore}
            className='mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50'
          >
            {seeMore ? 'SEE LESS' : 'SEE MORE'}
          </button>
        </div>

        <div className='rounded-lg bg-gray-100 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Start a New</h2>
            <img src={apple} alt='' className='h-40 w-auto' />
          </div>
          <button
            onClick={handleStartSurvey}
            className='mt-4 rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600'
          >
            START SURVEY
          </button>
        </div>
      </div>
    )
  }

  if (currentStep === 'questions') {
    const currentQuestion = questions[currentQuestionIndex]

    return (
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='rounded-lg bg-white p-8 shadow-sm'>
          <h2 className='mb-8 text-center text-xl font-semibold'>
            {currentQuestion.question_title}
          </h2>
          <div className='space-y-4'>
            {currentQuestion.options.map((option) => (
              <button
                key={option.option_id}
                onClick={() => handleSelectAnswer(option.carbon_value)}
                className={`w-full rounded-md py-3 text-center text-white transition-transform hover:scale-105 ${
                  selectedAnswer === option.carbon_value
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`}
              >
                {option.option_name}
              </button>
            ))}
          </div>
          <div className='mt-8 flex justify-between'>
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className='rounded-md bg-gray-500 px-6 py-2 text-white disabled:opacity-50'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className='rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600'
            >
              {currentQuestionIndex === questions.length - 1
                ? 'Complete'
                : 'Next'}
            </button>
          </div>
          <div className='mt-4 text-sm text-gray-500'>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='text-center'>
        <div className='mx-auto mb-6 h-16 w-16 rounded-full bg-teal-400' />
        <h2 className='mb-2 text-2xl font-semibold'>Congratulations!</h2>
        <p className='mb-6 text-gray-600'>You've completed today's survey.</p>
        <div className='mb-8 text-3xl font-bold text-green-500'>
          {averageCarbonResult}kg CO₂
        </div>
        <button
          onClick={handleSaveRecord}
          className='rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600'
        >
          Save Record
        </button>
      </div>
    </div>
  )
}
