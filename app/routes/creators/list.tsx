import { Link } from "react-router";
import { createClient } from "~/client";
import CreatorCard from "~/components/CreatorCard";
import { type Creator, toCreator } from "~/types/creator.types";
import type { Route } from "./+types/list";
import "./list.scss";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap",
  },
];

export function meta() {
  return [{ title: "Find your new favorite creators here!" }];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ creators: Creator[] }> {
  // No pagination
  const results = await createClient(request)
    .supabaseClient.from("creators")
    .select("*");

  if (results.error || !results.data) {
    throw new Response("Failed to load creators", { status: 500 });
  }

  return { creators: results.data.map(toCreator) };
}

export default function ShowCreators({ loaderData }: Route.ComponentProps) {
  const { creators } = loaderData;

  return (
    <>
      <section className="hero">
        <h1>Creatorverse</h1>
        <p>Discover and find your new favorite creators</p>
      </section>
      <div className="creators-grid">
        {creators.length === 0 ? (
          <div className="creators-empty">
            <p>No creators yet. Be the first to add one!</p>
            <Link to="/new" role="button">Add a Creator</Link>
          </div>
        ) : (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        )}
      </div>
    </>
  );
}
