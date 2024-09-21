"use client"
import React, { useState } from 'react'
import { ChevronLeft, ChevronDown, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function BioData() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback('Profile updated successfully!')
    setTimeout(() => setFeedback(''), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Link href="/profile">
      <header className="bg-white p-4 flex items-center border-b border-gray-200">
        <button aria-label="Go back" className="text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold ml-4">Bio-data</h1>
      </header>
      </Link>
      
      <main className="flex-1 p-6 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-red-400 rounded-full overflow-hidden mb-2">
            <img src="https://i.pinimg.com/564x/07/55/38/075538bf5387809a568c5f496d06eb10.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold">Suhani</h2>
          <p className="text-gray-500 text-sm">suhanihumain@gmail.com</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              placeholder="What's your first name?"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              placeholder="And your last name?"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex">
            <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-l-md border border-r-0 border-gray-300">
              <div className="w-6 h-4 bg-green-600" />
            </div>
            <input
              className="flex-1 p-3 border border-gray-300 rounded-r-md text-gray-700"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded-md appearance-none text-gray-700"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              type="text"
              placeholder="What is your date of birth?"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none" />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg"
            type="submit"
          >
            Update Profile
          </button>
        </form>
        {feedback && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            {feedback}
          </div>
        )}
      </main>
    </div>
  )
}