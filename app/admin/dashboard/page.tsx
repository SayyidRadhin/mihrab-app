// app/admin/dashboard/page.tsx
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
import { useFCM } from "@/app/hooks/useFCM";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BellOff, CheckCircle, Database } from "lucide-react";

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
  const [useMemoryStorage, setUseMemoryStorage] = useState(false);

  // Initialize FCM for admin notifications
  const { permission, error: fcmError, tokenSaved } = useFCM();

  // Check if IndexedDB is available
  const checkIndexedDBSupport = () => {
    try {
      return typeof indexedDB !== 'undefined';
    } catch (e) {
      return false;
    }
  };

  const initDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      if (!checkIndexedDBSupport()) {
        reject(new Error('IndexedDB not supported'));
        return;
      }

      try {
        const request = indexedDB.open("studentsDB", 1);
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains("students")) {
            db.createObjectStore("students", { keyPath: "id" });
          }
        };
        
        request.onsuccess = (event) => {
          resolve((event.target as IDBOpenDBRequest).result);
        };
        
        request.onerror = (event) => {
          console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
          reject((event.target as IDBOpenDBRequest).error);
        };
        
        request.onblocked = () => {
          console.warn('IndexedDB blocked - using memory storage');
          reject(new Error('IndexedDB blocked'));
        };
      } catch (error) {
        console.error('IndexedDB not available:', error);
        reject(error);
      }
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
          console.log('✅ Loaded from IndexedDB:', data.length, 'students');
          resolve(data);
        };
        
        request.onerror = () => {
          console.error("Error loading from IndexedDB");
          resolve([]);
        };
      });
    } catch (error) {
      console.warn("IndexedDB unavailable, using memory storage:", error);
      setUseMemoryStorage(true);
      return [];
    }
  };

  const addToIDB = async (newStudents: Student[]) => {
    if (useMemoryStorage) {
      console.log('📦 Using memory storage (IndexedDB unavailable)');
      return;
    }

    try {
      const db = await initDB();
      const tx = db.transaction("students", "readwrite");
      const store = tx.objectStore("students");
      newStudents.forEach((student) => store.put(student));
      await new Promise((resolve, reject) => {
        tx.oncomplete = resolve;
        tx.onerror = reject;
      });
      console.log('✅ Saved to IndexedDB:', newStudents.length, 'students');
    } catch (error) {
      console.warn("Could not save to IndexedDB:", error);
      setUseMemoryStorage(true);
    }
  };

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
        return [];
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

      console.log("Fetched initial data:", newData.length, "students");
      
      if (newData.length > 0) {
        await addToIDB(newData);
        setStudents(newData);
        setLastNewDate(newData[0].registrationDate);
        setLastDocSnap(snap.docs[snap.docs.length - 1]);
        setHasMore(newData.length === 10);
      }
      return newData;
    } catch (error) {
      console.error("Error fetching initial students:", error);
      return [];
    }
  };

  const fetchNewStudents = async () => {
    if (!lastNewDate) {
      console.log("No lastNewDate, performing initial fetch instead");
      return fetchInitialStudents();
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
        return [];
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

      console.log("Fetched new data:", newData.length, "students");
      
      if (newData.length > 0) {
        await addToIDB(newData);
        setStudents((prev) => {
          const combined = [...newData, ...prev].sort((a, b) => 
            b.registrationDate.localeCompare(a.registrationDate)
          );
          return combined;
        });
        setLastNewDate(newData[0].registrationDate);
      }
      return newData;
    } catch (error) {
      console.error("Error fetching new students:", error);
      return [];
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

      console.log("Fetched older data:", newData.length, "students");

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
      loadFromIDB().then(async (cachedData) => {
        // Always fetch new students to ensure we get the latest
        const newData = await fetchNewStudents();
        if (cachedData.length === 0 && newData.length === 0) {
          await fetchInitialStudents();
        } else if (cachedData.length > 0) {
          // Merge cached data with new data, avoiding duplicates
          const combined = [...newData, ...cachedData].filter(
            (student, index, self) =>
              index === self.findIndex((s) => s.id === student.id)
          ).sort((a, b) => b.registrationDate.localeCompare(a.registrationDate));
          setStudents(combined);
          setLastNewDate(combined[0]?.registrationDate || null);
          setHasMore(combined.length % 10 === 0);
        }
        setInitialFetchDone(true);
      });
    }
  }, [loading]);

  // Periodic check for new students
  useEffect(() => {
    if (!loading && initialFetchDone) {
      const interval = setInterval(() => {
        fetchNewStudents();
      }, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [loading, initialFetchDone]);

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
          {/* Storage Warning */}
          {useMemoryStorage && (
            <Alert className="mb-4 border-orange-500">
              <Database className="h-4 w-4" />
              <AlertDescription>
                Browser storage is unavailable. Data will be fetched from server on each visit.
                <br />
                <small>Enable cookies and site data in browser settings for better performance.</small>
              </AlertDescription>
            </Alert>
          )}

          {/* Notification Status */}
          {fcmError ? (
            <Alert className="mb-4 border-yellow-500">
              <BellOff className="h-4 w-4" />
              <AlertDescription>
                {fcmError === 'No active service worker' ? (
                  <>
                    Push notifications disabled: No active service worker.
                    <br />
                    <small>Check DevToolsApplication  Service Workers to ensure firebase-messaging-sw.js is active. Try refreshing the page.</small>
                  </>
                ) : fcmError === 'Invalid service worker registration' ? (
                  <>
                    Push notifications disabled: Invalid service worker registration.
                    <br />
                    <small>Check firebase-messaging-sw.js and ensure it’s active in DevTools  Application  Service Workers.</small>
                  </>
                ) : fcmError === 'Browser storage is blocked' ? (
                  <>
                    Push notifications disabled: Browser storage is blocked.
                    <br />
                    <small>Go to <strong>chrome://settings/content/all</strong> and allow cookies for this site.</small>
                  </>
                ) : (
                  <>Notifications setup failed: {fcmError}</>
                )}
              </AlertDescription>
            </Alert>
          ) : tokenSaved ? (
            <Alert className="mb-4 border-green-500">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Notifications enabled successfully. You'll receive alerts for new registrations.
              </AlertDescription>
            </Alert>
          ) : permission === 'granted' && (
            <Alert className="mb-4 border-blue-500">
              <BellOff className="h-4 w-4" />
              <AlertDescription>
                Setting up notifications...
              </AlertDescription>
            </Alert>
          )}

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