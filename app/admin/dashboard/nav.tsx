"use client";
import { Icon, LogIn, Menu, User2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";


import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebaseconfig";
import { Button } from "@/components/ui/button";


function Nav() {




  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Perform any additional cleanup or navigation if needed
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
     console.log(user.displayName);
     
    } else {
      // No user is signed in.
    }
  });



  

 
  
  return (
    <nav className="fixed   t-0 right-0 left-0 py-4  border-b border-b-slate-200  flex justify-between items-center  z-20 px-8">
       

      <div className="  rounded flex gap-2">
        {" "}  
    <h1 className="text-primaryAccent font-bold text">Mihrab Academy</h1>
         
      </div>
      <div className="hidden sm:block">
      </div>
      <div className="user    items-center gap-3 sm:flex">
        <Button variant="outline">Admin Mode</Button><Button variant="outline" onClick={handleLogout}>Logout</Button>

          <div>
          {/* {
            currentUser ? (
              <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-10 h-10 ring-2 ring-slate-300 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
                  <AvatarImage src={unsubscribe?.photoURL as string} />
                  <AvatarFallback className="bg-slate-300 text-white">
                    <User2 />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4">
                <div className="flex gap-2 items-center">
                  <figure className="user  px-4 flex gap-3 mt-auto py-4 items-center ">
                    <Avatar className="w-10 h-10 ring-4 ring-slate-200 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
                      <AvatarImage src={unsubscribe?.photoURL as string} />
                      <AvatarFallback className="bg-slate-300 text-white">
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold  leading-3 items-end tracking-tighter capitalize dark:text-slate-200 text-slate-700 text-base opacity-80">
                        {currentUser?.displayName}
                      </p>
                      <span className="opacity-80 dark:text-slate-200 text-sm text-slate-600 ">
                        member
                      </span>
                    </div>
                  </figure>
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    className="mr-auto ml-auto h-0 py-4 mt-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
              <Button
               variant="outline"
               onClick={onClick}
               > 
              <LogIn className="w-4"/> <span className="pl-3 font-medium">LogIn</span>
              </Button>
            )
          }
         */}
        </div>
      </div>
      {/* <div onClick={onClick} className="sm:hidden">
        <Menu className="rounded-full opacity-80 dark:text-slate-200 cursor-pointer" />
      </div> */}
    </nav>
  );
}

export default Nav;
