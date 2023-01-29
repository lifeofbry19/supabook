import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useRef, useEffect } from "react";

export default function form({ toastMessages }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [ingredients, setIngredients] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [toggle, setToggle] = useState(false);
  const ingredientInputRef = useRef();
  const publishRef = useRef(false);
  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ingredientInputRef.current.value]);
    ingredientInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit data to supabase recipes table

    supabase
      .from("recipes")
      .insert([
        {
          name: e.target.recipeName.value,
          description: e.target.recipeDescription.value,
          ingredients: ingredients,
          user_id: user?.id,
          version: 1,
          published: toggle,
        },
      ])
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

      <form className="max-w-[500px]" onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col ">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            name="recipeName"
            className="input input-bordered input-accent"
          />
        </div>
        <div className="mb-5 flex flex-col ">
          <label htmlFor="recipeDescription">Recipe Description</label>
          <textarea
            name="recipeDescription"
            className="textarea textarea-accent"
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
          {ingredients &&
            ingredients.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" w-fit min-w-[50px] mb-2 p-3 rounded-lg bg-white mr-3 justify-center items-center"
                >
                  <button
                    className="absolute rounded-full bg-black -translate-x-5 -translate-y-5 text-white opacity-70 -mr-4 w-6 h-6"
                    onClick={() => {
                      setIngredients(
                        ingredients.filter((ingredient) => ingredient !== item)
                      );
                    }}
                  >
                    X
                  </button>
                  <p className="text-black">{item}</p>
                </div>
              );
            })}
        </div>

        <div class="form-control w-52">
          <label class="cursor-pointer label">
            <span class="label-text">Publish Publicly:</span>
            <input
              type="checkbox"
              checked={toggle}
              class="toggle toggle-accent"
              onChange={(e) => {
                e.target.checked = !e.target.checked;
                setToggle(!toggle);
              }}
            />
          </label>
        </div>

        <button className="btn btn-success w-32" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
