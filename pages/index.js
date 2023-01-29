import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import LandingPage from "../components/LandingPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = ({}) => {
  const session = useSession();
  const user = useUser();
  const supabase = useSupabaseClient();

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {!session ? (
        <div className="flex justify-center items-center">
          <h3 className="text-2xl self-center w-[500px] mt-5 text-gray-400">
            Sign in or create an account to be able to create and manage your
            own super cookbook, or feel free to browse the Discover page for
            recipes published by Supabook users!
          </h3>
          <div className="p-5 mt-32 rounded-md mx-auto w-[500px] bg-gray-100 border">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </div>{" "}
        </div>
      ) : (
        <>
          <LandingPage user={user} />
        </>
      )}
    </div>
  );
};

export default Home;
