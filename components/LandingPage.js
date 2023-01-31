import Link from "next/link";

export default function LandingPage({ user }) {
  return (
    <>
      <div class="flex flex-col gap-5 lg:flex-row w-full mt-16">
        <div class="grid flex-grow card bg-base-300 rounded-box">
          <div class="hero flex flex-col justify-start items-start">
            <div class="hero-content text-start">
              <div class="max-w-md">
                <h1 class="text-3xl md:text-5xl font-bold">
                  Welcome to Supabook
                </h1>
                <p class="py-6">
                  Create recipes with ease with built in versioning. Get started
                  now or browse published recipes.
                </p>
                <Link href="/recipes">
                  <button class="btn btn-primary">
                    Browse Published Recipes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:divider lg:divider-horizontal"></div>
        <div class="grid flex-grow card bg-base-300 rounded-box ">
          <div class="hero  flex flex-col justify-start items-start">
            <div class="hero-content text-start">
              <div class="max-w-md">
                <h1 class="text-2xl  md:text-3xl font-bold">
                  A Versioning System for Your Recipes
                </h1>
                <p class="py-6">
                  Each recipe you create will have a version number, starting
                  from 1. If you really like that recipe but want to save a copy
                  of it with just a few small changes, you have the option to
                  copy it over to version 2 of that recipe. This allows you to
                  keep track of every iteration of allows your favorite recipes!
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/${user.id}/user-recipes`}>
                    <button class="btn btn-primary ">My Recipes</button>
                  </Link>
                  <Link href={`/${user.id}`}>
                    <button class="btn btn-primary">Manage My Account</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
