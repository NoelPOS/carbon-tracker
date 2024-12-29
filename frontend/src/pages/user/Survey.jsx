import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { surveyQuestions } from '../../data/survey-questions'
import apple from '../../assets/apple.png'

const previousRecords = [
  { number: 1, date: '20.11.2024', amount: 'Avg: 12.5 kg' },
  { number: 2, date: '15.11.2024', amount: 'Avg: 13.2 kg' },
  { number: 3, date: '2.11.2024', amount: 'Avg: 14.0 kg' },
]

export default function Survey() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('start')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleStartSurvey = () => {
    setCurrentStep('questions')
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

      if (currentQuestionIndex < surveyQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setCurrentStep('complete')
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(answers[currentQuestionIndex - 1] || null)
    }
  }

  const handleSaveRecord = () => {
    navigate('/')
  }

  if (currentStep === 'start') {
    return (
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Previous Records */}
        <div className='mb-8 rounded-lg bg-gray-100 p-6'>
          <h2 className='mb-4 text-lg font-semibold'>Your Previous Records</h2>
          <div className='overflow-hidden rounded-lg bg-white'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                    Number
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
                {previousRecords.map((record) => (
                  <tr key={record.number} className='border-b'>
                    <td className='px-6 py-4'>{record.number}</td>
                    <td className='px-6 py-4'>{record.date}</td>
                    <td className='px-6 py-4'>{record.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className='mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50'>
            SEE MORE
          </button>
        </div>

        {/* Start New Survey */}
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
    const currentQuestion = surveyQuestions[currentQuestionIndex]

    return (
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='rounded-lg bg-white p-8 shadow-sm'>
          <h2 className='mb-8 text-center text-xl font-semibold'>
            {currentQuestion.question}
          </h2>
          <div className='space-y-4'>
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectAnswer(option.value)}
                className={`w-full rounded-md py-3 text-center text-white transition-transform hover:scale-105 ${
                  selectedAnswer === option.value
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`}
              >
                {option.text}
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
              {currentQuestionIndex === surveyQuestions.length - 1
                ? 'Complete'
                : 'Next'}
            </button>
          </div>
          <div className='mt-4 text-sm text-gray-500'>
            Question {currentQuestionIndex + 1} of {surveyQuestions.length}
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
        <div className='mb-8 text-3xl font-bold text-green-500'>1.6kg CO₂</div>
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
