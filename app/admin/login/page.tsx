"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card } from "@/components/ui/card";
// import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/lib/firebaseconfig";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

interface HandleLoginEvent extends React.FormEvent<HTMLFormElement> {}

const handleLogin = async (e: HandleLoginEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/admin/dashboard");
    } catch (err) {
        setError("Invalid credentials or account not found");
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <div className="scroll-smooth bg-white overflow-hidden grid w-full min-h-screen">
        {/* <Nav /> */}
        <section
          id="home"
          className="max-w-5xl relative grid items-center w-full mt-0 flex-col mx-auto max-lg:px-[10%] min-h-screen"
        >
          <div className="text-black h-full mt-28 flex sm:flex-row max-sm:mt-10 max-sm:gap-2 gap-2 w-full max-h-[80%] sm:h-[80%] items-center">
            <Card className="p-6 w-full max-w-96 mx-auto">
              <form className="py-2 flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="form-title font-semibold text-center">Admin Login</div>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="form-group">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <Button
                  className={`button ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="spinner-border spinner-border-sm text-light mr-2" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      Loading...
                    </div>
                  ) : (
                    "Admin Login"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;    