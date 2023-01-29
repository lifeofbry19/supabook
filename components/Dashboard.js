import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Dashboard({ session, recipes }) {
  console.log(recipes);
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>{recipes ? "got some recipes" : "no recipes"}</div>
    </>
  );
}
