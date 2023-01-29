import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ConfirmModal({ label, user, recipe }) {
  const supabase = useSupabaseClient();

  const deleteRecipe = async () => {
    console.log("deleting");
    const { data, error } = await supabase
      .from("recipes")
      .delete()
      .eq("user_id", user.id);
    if (error) {
      console.log(error);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <label for="delete-modal" className="btn">
        Delete Recipe
      </label>

      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this recipe?
          </h3>

          <div className="modal-action gap-2">
            <label
              for="delete-modal"
              className="btn btn-success text-white"
              onClick={deleteRecipe}
            >
              Yes
            </label>
            <label for="delete-modal" className="btn btn-error text-white">
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
