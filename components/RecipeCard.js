import Link from "next/link";

export default function recipePreviewCard({ recipe }) {
  return (
    <>
      <Link href={`/recipes/${recipe.id}`}>
        <div
          onClick={(e) => {
            console.log("clicked on recipe card");
          }}
          className="flex flex-col justify-center h-[200px] w-[300px] bg-gray-300  items-center border rounded-lg cursor-pointer"
        >
          <h2 className="font-bold text-xl text-gray-700 mb-5">
            {recipe.name || "Title"}
          </h2>
          <br />
          <p className="text-gray-700">
            {recipe.description ? recipe.description : ""}
          </p>
          {/* <p className="text-gray-700">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => {
            if (index === recipe.ingredients.length - 1)
              return <p>{`${ingredient}`}</p>;
            return <p>{`${ingredient},`}</p>;
          })}
      </p> */}
          <p className="font-bold mt-5 text-gray-700">V. {recipe.version}</p>
        </div>
      </Link>
    </>
  );
}
