"user client"

import { options } from "@/utils";
import Dashboard from "./dashboard/page";
import { getServerSession } from "next-auth";
import Sidebar from "./ui/dashboard/sidebar/sidebar";

export default async function Home() {
  const session = await getServerSession(options);
  console.log({ session, options });

  return (
    <>
      {session ? (
        <>
          <div className="flex">
            <div className="flex-1 p-20 max-w-20 min-h-screen bg-bgSoft">
              <Sidebar />
            </div>
            <div className="flex-4 p-20">
              <Dashboard />
            </div>
          </div>
        </>
      ) : (
        <h1 className="m-5">You are not Login</h1>
      )}
    </>
  );
}
