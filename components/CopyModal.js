import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ConfirmModal({ label, user, recipe }) {
  const supabase = useSupabaseClient();

  const copyRecipe = async () => {
    console.log("copying");
    const { data, error } = await supabase.from("recipes").insert([
      {
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        user: user?.id,
        version: recipe.version + 1,
      },
    ]);

    if (data) {
      console.log(res);
      router.push(`/recipes/${data[0].id}`);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label for="copy-modal" className="btn mr-1">
        Copy Recipe
      </label>

      <input type="checkbox" id="copy-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to copy this recipe?
          </h3>
          <p></p>
          <div className="modal-action gap-2">
            <label
              for="copy-modal"
              className="btn btn-success text-white"
              onClick={copyRecipe}
            >
              Yes
            </label>
            <label for="copy-modal" className="btn btn-error text-white">
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
