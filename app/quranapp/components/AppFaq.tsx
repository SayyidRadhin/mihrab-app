import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const faqData = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern, ensuring accessibility for all users."
  },
  {
    question: "How can I track my Hifz progress?",
    answer: "Our app provides a progress tracker that logs your daily memorization and revision, with detailed statistics and milestones."
  },
  {
    question: "Is the app available offline?",
    answer: "Yes, you can download lessons and audio for offline use, perfect for memorizing without an internet connection."
  },
  {
    question: "Can I customize my learning plan?",
    answer: "Absolutely! You can set daily goals, choose specific Surahs, and adjust the pace to suit your schedule."
  },
  {
    question: "Is there support for multiple languages?",
    answer: "Yes, the app supports multiple languages, including Arabic, English, and Urdu, for a seamless learning experience."
  }
]

export default function AppFaq() {
  return (
    <section className='py-28 max-w-5xl grid items-center w-full mt-0 flex-col mx-auto max-lg:px-[10%]'>
      <h2 className='text-3xl font-bold text-center text-black mb-10'>Frequently Asked Questions</h2>
      <div className='text-black h-full flex-col max-sm:mt-10 max-sm:gap-8 gap-8 w-full max-h-[80%] sm:h-[80%] items-center'>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}