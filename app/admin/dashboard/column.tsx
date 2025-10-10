"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageCircle, Mail, User2 } from "lucide-react";

type Student = {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  class: string;
  course: string;
  email: string;
  registrationDate: string;
};

export const studentColumn: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium flex gap-5 items-center">
          <div className="user flex px-8 gap-2 mt-auto py-4 items-center">
            <Avatar className="w-12 h-12 ring-4 ring-slate-200 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${row.original.name}`} />
              <AvatarFallback className="bg-slate-300 text-white">
                <User2 />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold leading-3 items-end tracking-tighter capitalize dark:text-slate-200 text-slate-700 text-base opacity-80">
                {row.original.name}
              </p>
              <span className="opacity-80 dark:text-slate-200 text-sm text-slate-600">
                student
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-3 pr-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="h-0 py-4">
                <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-auto">
              <DialogHeader>
                <DialogTitle>{row.original.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p>Age: {row.original.age}</p>
                <p>Gender: {row.original.gender}</p>
                <p>Class: {row.original.class}</p>
                <p>Course: {row.original.course}</p>
                <p>Email: {row.original.email}</p>
                <p>Phone: {row.original.phone}</p>
                <p>Registration Date: {row.original.registrationDate}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/${row.original.phone}`, "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${row.original.email}`, "_blank")}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];