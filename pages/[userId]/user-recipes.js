import { supaClient } from "../../supa-client";
import RecipeCard from "../../components/RecipeCard";
import Link from "next/link";

export default function userRecipes({ recipes }) {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col-reverse md:flex-row gap-5 md:justify-between md:gap-0 md:items-center">
        <h2 className="text-2xl font-bold mb-3">My Recipes</h2>
        <Link href="/recipes/create">
          <button className="btn btn-primary">Create a Recipe</button>
        </Link>
      </div>
      <div class="divider"></div>
      <div className="w-full flex flex-wrap gap-2">
        {recipes &&
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { userId } = context.query;
  const { data, error } = await supaClient
    .from("recipes")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.log(error);
  }
  return {
    props: {
      recipes: data,
    },
  };
};
