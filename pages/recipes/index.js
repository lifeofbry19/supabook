import RecipeCard from "../../components/RecipeCard";
import { supaClient } from "../../supa-client";

export default function recipes({ recipes }) {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4">
      <h2 className="text-2xl font-bold mb-3">Published Recipes</h2>
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
  const { data, error } = await supaClient
    .from("recipes")
    .select("*")
    .eq("published", true);

  if (error) {
    console.log(error);
  }
  return {
    props: {
      recipes: data,
    },
  };
};
