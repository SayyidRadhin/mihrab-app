"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where, orderBy, limit, startAfter, DocumentSnapshot } from "firebase/firestore";
import React from "react";
import { DataTable } from "./data-table";
import { studentColumn } from "./column";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/app/lib/firebaseconfig";
import Nav from "./nav";

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

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [lastNewDate, setLastNewDate] = useState<string | null>(null);
  const [lastDocSnap, setLastDocSnap] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const initDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("studentsDB", 1);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("students")) {
          db.createObjectStore("students", { keyPath: "id" });
        }
      };
      request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
      request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
    });
  };

  const loadFromIDB = async () => {
    try {
      const db = await initDB();
      return new Promise<Student[]>((resolve) => {
        const tx = db.transaction("students", "readonly");
        const store = tx.objectStore("students");
        const request = store.getAll();
        request.onsuccess = () => {
          const data = request.result.sort((a, b) => 
            b.registrationDate.localeCompare(a.registrationDate)
          );
          setStudents(data);
          if (data.length > 0) {
            setLastNewDate(data[0].registrationDate);
            setHasMore(data.length % 10 === 0);
          }
          resolve(data);
        };
        request.onerror = () => {
          console.error("Error loading from IndexedDB");
          resolve([]);
        };
      });
    } catch (error) {
      console.error("IndexedDB error:", error);
      return [];
    }
  };

  const addToIDB = async (newStudents: Student[]) => {
    try {
      const db = await initDB();
      const tx = db.transaction("students", "readwrite");
      const store = tx.objectStore("students");
      newStudents.forEach((student) => store.put(student));
      await new Promise((resolve) => (tx.oncomplete = resolve));
    } catch (error) {
      console.error("Error adding to IndexedDB:", error);
    }
  };

  // Initial fetch from Firestore
  const fetchInitialStudents = async () => {
    console.log("Fetching initial data from Firebase");
    try {
      const q = query(
        collection(db, "students"),
        orderBy("registrationDate", "desc"),
        limit(10)
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        console.log("No students found in Firebase");
        setHasMore(false);
        return;
      }

      const newData = snap.docs.map((doc) => {
        const data = doc.data();
        // Convert Firestore timestamp to ISO string
        const registrationDate = data.registrationDate?.toDate?.()?.toISOString() || new Date().toISOString();
        return {
          id: doc.id,
          ...data,
          registrationDate
        } as Student;
      });

      console.log("Fetched initial data:", newData);
      
      if (newData.length > 0) {
        await addToIDB(newData);
        setStudents(newData);
        setLastNewDate(newData[0].registrationDate);
        setLastDocSnap(snap.docs[snap.docs.length - 1]);
        setHasMore(newData.length === 10);
      }
    } catch (error) {
      console.error("Error fetching initial students:", error);
    }
  };

  const fetchNewStudents = async () => {
    if (!lastNewDate) {
      console.log("No lastNewDate, skipping new student fetch");
      return;
    }
    
    console.log("Checking for new students after:", lastNewDate);
    
    try {
      const q = query(
        collection(db, "students"),
        where("registrationDate", ">", new Date(lastNewDate)),
        orderBy("registrationDate", "desc")
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        console.log("No new students found");
        return;
      }

      const newData = snap.docs.map((doc) => {
        const data = doc.data();
        const registrationDate = data.registrationDate?.toDate?.()?.toISOString() || new Date().toISOString();
        return {
          id: doc.id,
          ...data,
          registrationDate
        } as Student;
      });

      console.log("Fetched new data:", newData);
      
      if (newData.length > 0) {
        newData.sort((a, b) => b.registrationDate.localeCompare(a.registrationDate));
        await addToIDB(newData);
        setStudents((prev) => [...newData, ...prev]);
        setLastNewDate(newData[0].registrationDate);
      }
    } catch (error) {
      console.error("Error fetching new students:", error);
    }
  };

  const fetchOlderStudents = async () => {
    if (!lastDocSnap) {
      console.log("No lastDocSnap for pagination");
      return;
    }
    
    console.log("Fetching older students");
    
    try {
      const q = query(
        collection(db, "students"),
        orderBy("registrationDate", "desc"),
        startAfter(lastDocSnap),
        limit(10)
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        console.log("No more students to load");
        setHasMore(false);
        return;
      }

      const newData = snap.docs.map((doc) => {
        const data = doc.data();
        const registrationDate = data.registrationDate?.toDate?.()?.toISOString() || new Date().toISOString();
        return {
          id: doc.id,
          ...data,
          registrationDate
        } as Student;
      });

      console.log("Fetched older data:", newData);

      if (newData.length > 0) {
        await addToIDB(newData);
        setStudents((prev) => [...prev, ...newData]);
        setLastDocSnap(snap.docs[snap.docs.length - 1]);
        setHasMore(newData.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching older students:", error);
      setHasMore(false);
    }
  };

  const checkAdmin = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/admin/login");
      }
    });
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (!loading && !initialFetchDone) {
      loadFromIDB().then((cachedData) => {
        if (cachedData.length === 0) {
          // No cached data, fetch from Firebase
          fetchInitialStudents();
        } else {
          // Have cached data, check for new students
          fetchNewStudents();
        }
        setInitialFetchDone(true);
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Nav />   

      <div className="w-full max-h-screen min-h-screen flex pt-[5.1em]">

        <div className="hero w-full py-3 px-4 sm:px-8 pt-[5em] md:mt-4 overflow-auto">
          <div className="p-4 w-full mb-2">
            {students.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No students found. Add some students to get started!</p>
              </div>
            ) : (
              <DataTable columns={studentColumn} data={students} />
            )}
          </div>
          {hasMore && students.length > 0 && (
            <div className="flex justify-center mt-4 mb-8">
              <Button onClick={fetchOlderStudents}>Load More</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;