import { useUser } from "@supabase/auth-helpers-react";
import Form from "../../components/Form";

export default function create() {
  const toastMessages = {
    success: "Recipe Created!",
    error: "Error Creating Recipe",
  };
  const user = useUser();
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4">
      <h2 className="text-2xl font-bold mb-3">Create a Recipe</h2>
      <Form toastMessages={toastMessages} />
    </div>
  );
}
