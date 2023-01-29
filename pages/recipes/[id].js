import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { supaClient } from "../../supa-client";
import EditForm from "../../components/EditForm";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import CopyModal from "../../components/CopyModal";

export default function recipe({ recipe }) {
  const user = useUser();
  const [editMode, setEditMode] = useState(false);
  const [userIsCreator, setUserIsCreator] = useState(false);

  useEffect(() => {
    if (!recipe || !user) return;
    if (user?.id === recipe.user_id) {
      setUserIsCreator(true);
    }
    // check if the user is the creator of the recipe
    // if so, set userIsCreator to true
    // if not, set userIsCreator to false
  }, [recipe, user]);

  const toastMessages = {
    success: "Changes Saved!",
    error: "Error Updating Recipe",
  };

  return !editMode ? (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4">
      <div className="flex justify-between p-6">
        <h2 className="text-2xl font-bold mb-3">{recipe?.name}</h2>
        {userIsCreator && (
          <div>
            <button
              className="btn bg-primary"
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit
            </button>{" "}
            <CopyModal recipe={recipe} user={user} />
            <DeleteModal recipe={recipe} user={user} />
          </div>
        )}
      </div>
      <div className="divider"></div>
      <div className="p-6">
        <div className="mb-10">
          <h3 className="text-3xl mb-6 text-white">Summary:</h3>
          <p className="text-lg">
            {recipe.description ? recipe.description : "no description"}
          </p>
        </div>
        <div className="mb-10">
          <h3 className="text-3xl mb-6 text-white">Ingredients:</h3>
          <div className="flex">
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className=" w-fit min-w-[50px] mb-2 p-3 rounded-lg bg-white mr-3 justify-center items-center"
                >
                  <p className="text-black">{ingredient}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4">
      <EditForm recipe={recipe} user={user} setEditMode={setEditMode} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const { data, error } = await supaClient
    .from("recipes")
    .select("*")
    .eq("id", id);
  if (error) {
    console.log(error);
  }
  return {
    props: {
      recipe: data[0],
    },
  };
};
