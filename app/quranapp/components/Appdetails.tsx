'use client'
import React from 'react'
import {
  BookOpenCheck,
  RefreshCcw,
  History,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'

function AppDetails() {
  return (
    <section
      id='app-details'
      className='py-28 w-full rounded-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black'
    >
      <div className='max-w-6xl w-full flex-col mx-auto'>
        {/* Heading */}
        <div className='mb-14 flex flex-col  items-center gap-4 sm:flex-row sm:justify-between'>
          <h2 className='text-5xl sm:text-5xl text-primaryAccent  text-primary max-sm:text-center uppercase font-extrabold max-w-[25ch]'>
            A New Imagination for{' '}
            <span className='text-slate-600'>Qur’an Memorizing</span>
          </h2>
        </div>

        {/* Features */}
        <div className='flex flex-wrap gap-6 justify-center'>
          {/* Feature 1 */}
          <div className='card w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-slate-300 bg-secondaryAccent px-6 py-10 flex flex-col items-center text-center transition '>
            <BookOpenCheck
              size={70}
              strokeWidth={1.5}
              className='text-red-400 mb-4 hover:scale-110 transition-transform'
            />
            <h1 className='font-bold text-[#262364] text-2xl mb-3'>
              Daily Recitation to Scholars
            </h1>
            <p className='text-sm text-slate-600 max-w-[30ch]'>
              Students can recite what they have memorized directly to real
              scholars every day — just like in a physical Hifz class.
            </p>
          </div>

          {/* Feature 2 */}
          <div className='card w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-slate-300 bg-secondaryAccent px-6 py-10 flex flex-col items-center text-center transition '>
            <RefreshCcw
              size={70}
              strokeWidth={1.5}
              className='text-red-400 mb-4 hover:scale-110 transition-transform'
            />
            <h1 className='font-bold text-[#262364] text-2xl mb-3'>
              Daily Revision System
            </h1>
            <p className='text-sm text-slate-600 max-w-[30ch]'>
              Along with new memorization, students revise previously learned
              portions through guided sessions with scholars.
            </p>
          </div>

          {/* Feature 3 */}
          <div className='card w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-slate-300 bg-secondaryAccent px-6 py-10 flex flex-col items-center text-center transition '>
            <History
              size={70}
              strokeWidth={1.5}
              className='text-red-400 mb-4 hover:scale-110 transition-transform'
            />
            <h1 className='font-bold text-[#262364] text-2xl mb-3'>
              Recitation History & Reports
            </h1>
            <p className='text-sm text-slate-600 max-w-[30ch]'>
              Track all recitations — daily, monthly, and yearly. Students can
              download detailed charts marked by scholars.
            </p>
          </div>

          {/* Feature 4 */}
          <div className='card w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-slate-300 bg-secondaryAccent px-6 py-10 flex flex-col items-center text-center transition '>
            <BookOpenCheck
              size={70}
              strokeWidth={1.5}
              className='text-red-400 mb-4 hover:scale-110 transition-transform'
            />
            <h1 className='font-bold text-[#262364] text-2xl mb-3'>
              Interactive Digital Qur’an
            </h1>
            <p className='text-sm text-slate-600 max-w-[30ch]'>
              Experience an elegant Qur’an interface designed for memorization —
              smooth navigation, bookmarks, and clear visuals.
            </p>
          </div>

          {/* Feature 5 */}
          <div className='card w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-slate-300 bg-secondaryAccent px-6 py-10 flex flex-col items-center text-center transition '>
            <MessageCircle
              size={70}
              strokeWidth={1.5}
              className='text-red-400 mb-4 hover:scale-110 transition-transform'
            />
            <h1 className='font-bold text-[#262364] text-2xl mb-3'>
              Chat with Scholars
            </h1>
            <p className='text-sm text-slate-600 max-w-[30ch]'>
              Students can easily message their scholars, ask doubts, and stay
              connected — all inside the app.
            </p>
          </div>

          {/* Feature 6 */}
          <div className='card w-full sm:w-[45%] lg:w-[30%] rounded-3xl border border-slate-300 bg-secondaryAccent px-6 py-10 flex flex-col items-center text-center transition '>
            <TrendingUp
              size={70}
              strokeWidth={1.5}
              className='text-red-400 mb-4 hover:scale-110 transition-transform'
            />
            <h1 className='font-bold text-[#262364] text-2xl mb-3'>
              Track Memorization Progress
            </h1>
            <p className='text-sm text-slate-600 max-w-[30ch]'>
              See how much of the Qur’an has been memorized — verse by verse and
              Surah by Surah, beautifully visualized.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppDetails
