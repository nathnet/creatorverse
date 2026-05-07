import { createClient } from "~/client";
import type { Route } from "./+types/list";
import CreatorCard from "~/components/CreatorCard";
import "./list.scss";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap",
  },
];

export function meta() {
  return [{ title: "Creators" }];
}

const CREATORS = [
  {
    id: 1,
    name: "John Doe",
    description: "A sample creator for demonstration purposes.",
    imageUrl: null,
    url: {
      tiktok: "johndoe",
      youtube: "johndoechannel",
      instagram: "john_doe_insta",
    },
  },
  {
    id: 911,
    name: "Jane Smith",
    description:
      "A sample creator for demonstration purposes, but this one is probably a little bit longer than normal and is likely going to overflow. This is how it should be though. Longer than 3 lines are just going to push into someone else's card.",
    imageUrl:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Jane-Smith.Mr-and-Mrs-Smith.webp",
    url: {
      tiktok: "janesmith",
      youtube: "janesmithchannel",
      instagram: "jane_smith_insta",
      twitter: "janesmith_twitter",
      website: "https://janesmith.example.com",
    },
  },
  {
    id: 123,
    name: "Bob Johnson",
    description: "Another sample creator for demonstration purposes.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_L._Johnson_watches_Donald_Trump.jpg",
    url: {
      youtube: "bobjohnsonchannel",
    },
  }
];

export async function loader(): Promise<{ creators: typeof CREATORS }> {
  const data = await createClient(new Request("http://localhost")).supabaseClient
    .from("creators")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  console.log(data);
  return { creators: CREATORS };
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
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </>
  );
}
