import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function profile({}) {
  const user = useUser();
  const signOut = async () => {
    const supabase = useSupabaseClient();
    let { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };
  const deleteAccount = async () => {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", user.id);
    if (error) {
      console.log(error);
    } else {
      router.push("/");
    }
  };

  const resetPassword = async () => {
    const supabase = useSupabaseClient();
    let { data, error } = await supabase.auth.resetPasswordForEmail(user.email);
    if (error) console.log(error);
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col-reverse md:flex-row gap-5 mb-2 md:justify-between md:gap-0 md:items-center">
        <h2 className="text-2xl font-bold mb-3">My Profile</h2>
        <button onClick={signOut} className="btn btn-primary">
          Sign Out
        </button>
      </div>
      <div className="mb-16 border  p-5">
        <div className=" grid-rows-2 grid-cols-2">
          <label className=" font-bold">Email:</label>
          <p className="mb-5">{user?.email}</p>
          <label className="mt-5 font-bold">Phone:</label>
          <p className="mb-5">{user?.phone ? user?.phone : "None"}</p>
          <>
            <label
              htmlFor="reset-modal"
              className="bg-emerald-400 btn mr-5 hover:bg-emerald-400  cursor-pointer text-white"
            >
              Reset Password
            </label>

            <input type="checkbox" id="reset-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Are you sure you want to reset your password?
                </h3>

                <div className="modal-action gap-2">
                  <label
                    htmlFor="reset-modal"
                    className="btn btn-success text-white"
                    onClick={resetPassword}
                  >
                    Yes
                  </label>
                  <label
                    htmlFor="reset-modal"
                    className="btn btn-error text-white"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </>
          <>
            <label
              htmlFor="delete-modal"
              className="bg-red-400 hover:bg-red-400 btn cursor-pointer text-white"
            >
              Delete Account
            </label>

            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Are you sure you want to delete this recipe?
                </h3>

                <div className="modal-action gap-2">
                  <label
                    htmlFor="delete-modal"
                    className="btn btn-success text-white"
                    onClick={deleteAccount}
                  >
                    Yes
                  </label>
                  <label
                    htmlFor="delete-modal"
                    className="btn btn-error text-white"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-3">My Recipes</h2>
        <p>
          Here are a few of your most recent recipes. View all your recipes{" "}
          <Link href="#" className=" text-blue-500">
            {" "}
            here.
          </Link>
        </p>
      </div>
    </div>
  );
}

// TO DO: add serverside props to get recipes for user

/* export const getServersideProps = async (context) => {
  const supabase = useSupabaseClient();
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
};
 */
