import Image from "next/image";
import { options } from "@/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
    const session = await getServerSession(options);
    console.log({ session, options });

    return (
        <>
            {session ? (
                <>
                    <h1>You are login as {session.user?.name} and your email is {session.user?.email}</h1>
                    <Link href="/dashboard"/>
                </>
            ) : (
                <h1 className="m-5">You are not Login</h1>
            )}
        </>
    );
}
