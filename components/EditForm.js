import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useRef, useEffect } from "react";

export default function form({ toastMessages, recipe, user, setEditMode }) {
  const supabase = useSupabaseClient();
  const [userRecipe, setUserRecipe] = useState(recipe);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [toggle, setToggle] = useState(false);

  const publishRef = useRef();
  const ingredientInputRef = useRef();
  const addIngredient = (e) => {
    e.preventDefault();
    setUserRecipe([...userRecipe, ingredientInputRef.current.value]);
    ingredientInputRef.current.value = "";
  };
  useEffect(() => {
    if (userRecipe.published === true) {
      setToggle(true);
    }
  }, [userRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit data to supabase recipes table

    supabase
      .from("recipes")
      .update([
        {
          name: userRecipe.name,
          description: userRecipe.description,
          ingredients: userRecipe.ingredients,
          userId: user?.id,
          published: toggle,
        },
      ])
      .eq("id", userRecipe.id)
      .then((res) => {
        setSubmitSuccess(true);
        console.log(res);
      })
      .catch((err) => {
        setSubmitSuccess(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (submitSuccess === true) {
      setTimeout(() => {
        setSubmitSuccess(null);
      }, 3000);
    }
  }, [submitSuccess]);

  return (
    <>
      {submitSuccess && (
        <div className="toast toast-end">
          <div className="alert alert-success ">
            <span>{toastMessages.success}</span>
          </div>
        </div>
      )}
      {/* 
      <div className="toast toast-end">
        <div className="alert alert-info bg-red-500 text-white">
          <span>{toastMessages.error}</span>
        </div>
      </div> */}

      {userRecipe && (
        <form className="max-w-[700px] mr-5" onSubmit={handleSubmit}>
          <div className="mb-5 flex flex-col ">
            <label htmlFor="recipeName">Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              className="input input-bordered input-accent"
              value={userRecipe.name}
            />
          </div>
          <div className="mb-5 flex flex-col ">
            <label htmlFor="recipeDescription">Recipe Description</label>
            <textarea
              name="recipeDescription"
              className="textarea textarea-accent"
              value={userRecipe.description}
            />
          </div>
          <div className="mb-5 flex gap-2 items-end">
            <div className="flex flex-col">
              <label htmlFor="ingredients">Ingredients</label>
              <input
                type="text"
                ref={ingredientInputRef}
                name="ingredients"
                className="input input-bordered input-accent"
              />
            </div>

            <div onClick={addIngredient} className="btn btn-info w-32">
              Add Ingredient
            </div>
          </div>
          <div className="flex w-full  mb-5 rounded-md flex-wrap ">
            {userRecipe.ingredients &&
              userRecipe.ingredients.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" w-fit min-w-[50px] mb-2 p-3 rounded-lg bg-white mr-3 justify-center items-center"
                  >
                    <button
                      className="absolute rounded-full bg-black -translate-x-5 -translate-y-5 text-white opacity-70 -mr-4 w-6 h-6"
                      onClick={() => {
                        setUserRecipe({
                          ...userRecipe,
                          ingredients: userRecipe.ingredients.filter(
                            (ingredient) => ingredient !== item
                          ),
                        });
                      }}
                    >
                      X
                    </button>
                    <p className="text-black">{item}</p>
                  </div>
                );
              })}
          </div>

          <div className="form-control w-52 mb-5">
            <label className="cursor-pointer label">
              <span className="label-text">Publish publicly:</span>
              <input
                type="checkbox"
                class="toggle toggle-accent"
                checked={toggle}
                onChange={(e) => {
                  e.target.checked = !e.target.checked;
                  setToggle(!toggle);
                }}
              />
            </label>
          </div>
          <button className="btn btn-success w-32 mr-3 " type="submit">
            Submit
          </button>
          <button
            className="btn bg-primary"
            onClick={() => {
              setEditMode(false);
            }}
          >
            Discard Changes
          </button>
        </form>
      )}
    </>
  );
}
