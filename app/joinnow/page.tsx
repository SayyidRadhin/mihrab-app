"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { LucidePlay, LucideApple, LibraryIcon, MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { db } from "../lib/firebaseconfig";
import { Button } from "@/components/ui/button";

export default function Page() {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    class: "",
    course: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: any) => {
    setFormData((prev) => ({ ...prev, course: value }));
  };

  const handlePhoneChange = (phone: any) => {
    setFormData((prev) => ({ ...prev, phone: phone || "" }));
  };

  interface FormData {
    name: string;
    age: string;
    gender: string;
    phone: string;
    class: string;
    course: string;
  }

  // Helper function to get course display name
  const getCourseDisplayName = (courseValue: string): string => {
    const courseMap: { [key: string]: string } = {
      'madrasa': 'Madrasa Education',
      'quran': 'Quran Hifz',
      'school': 'School'
    };
    return courseMap[courseValue] || courseValue;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Save student to Firestore
      const docRef = await addDoc(collection(db, "students"), {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        class: formData.class,
        course: formData.course,
        email: `${formData.name.toLowerCase().replace(/\s/g, '')}@meharabacademy.com`,
        registrationDate: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log('✅ Student registered with ID:', docRef.id);

      // Step 2: Send notification to admins
      try {
        console.log('📱 Sending notification to admins...');
        
        const response = await fetch('/api/send-notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentName: formData.name,
            studentClass: formData.class,
            course: getCourseDisplayName(formData.course),
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('✅ Notification sent successfully:', result);
        } else {
          console.warn('⚠️ Notification failed:', result);
          // Don't show error to user - registration was successful
        }
      } catch (notificationError) {
        console.error('❌ Error sending notification:', notificationError);
        // Don't block registration if notification fails
        // The student is already registered in Firestore
      }

      // Step 3: Redirect to success page
      Router.push("/");
      
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scroll-smooth bg-primaryAccent font-raleway overflow-hidden grid w-full min-h-screen">
      <section className='py-28 max-w-5xl grid items-center w-full mt-0 flex-col mx-auto max-lg:px-[10%]'>
        <div className='text-black h-full flex sm:flex-row justify-center flex-col max-sm:mt-10 max-sm:gap-8 gap-12 w-full max-h-[80%] sm:h-[80%] items-center'>
          <div className="flex flex-col w-full sm:-mt-6 max-sm:text-center">
            <div className='space-y-4'>
              <div className='flex gap-4 flex-row max-sm:flex-col items-center max-sm:justify-center'>
                <div className='bg-secondaryAccent rounded-2xl p-3'>
                  <LibraryIcon className='text-primaryAccent bg-secondaryAccent' size={40} />
                </div>
                <h2 className='text-4xl max-sm:text-center text-secondaryAccent font-semibold leading-tight'>
                  Meharab Academy
                </h2>
              </div>
              <p className='text-slate-100 text-base pt-2 max-w-[40ch] leading-relaxed'>
                Meharab Academy offers high-quality online classes from LKG to 10th standard, combining academic excellence with moral values. Our live and recorded sessions ensure flexible, accessible learning for every student. We aim to nurture your purpose and dreams. Start your journey today!
              </p>
              <div className="flex flex-row sm:gap-4 gap-2 max-sm:w-full max-sm:justify-center max-sm:flex-col">
                <div
                  onClick={() => Router.push('/quranapp')}
                  className="sm:text-lg flex text-center mt-2 max-sm:hidden bg-secondaryAccent justify-center gap-2 max-sm:w-full text-base border-solid border border-slate-400 text-slate-600 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1]"
                >
                  <MessageCircleIcon className='mt-1' size={20} />
                  Connect Us
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Card className="bg-white rounded-2xl shadow-lg p-6">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-[#262364]">Join us</CardTitle>
                <CardDescription className="">
                  Unlock knowledge, embrace growth today! Join us and start your learning journey together, let's shape a brighter future through education.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
                  {error && <div className="text-red-500 text-center">{error}</div>}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex flex-col space-y-1.5 w-1/2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" placeholder="Your age" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-1/2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input id="gender" placeholder="Your gender" value={formData.gender} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Phone Number [whatsapp]</Label>
                    <PhoneInput
                      defaultCountry="IN"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      inputClassName="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="class">Class</Label>
                    <Input id="class" placeholder="Your class" value={formData.class} onChange={handleChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="course">Select course</Label>
                    <Select onValueChange={handleSelectChange} value={formData.course} required>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="madrasa">Madrasa Education</SelectItem>
                        <SelectItem value="quran">Quran Hifz</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex">
                <Button
                  className="bg-primaryAccent flex-1 text-white rounded-full transition px-6 py-2 hover:bg-slate-700"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}