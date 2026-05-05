import type { Route } from "./+types/list";
import CreatorCard from "~/components/CreatorCard";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap",
  },
];

export function meta() {
  return [{ title: "Creators" }];
}

export default function ShowCreators() {
  return (
    <>
      <section className="hero">
        <h1>Creatorverse</h1>
        <p>Discover and find your new favorite creators</p>
      </section>
      <div className="creators-grid">
        <CreatorCard
          creator={{
            id: 1,
            name: "John Doe",
            description: "A sample creator for demonstration purposes.",
            imageUrl: null,
            url: {
              twitter: "johndoe",
              youtube: "johndoechannel",
              instagram: "john_doe_insta",
            },
          }}
        />
        <CreatorCard
          creator={{
            id: 911,
            name: "Jane Smith",
            description: "A sample creator for demonstration purposes.",
            imageUrl: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Jane-Smith.Mr-and-Mrs-Smith.webp",
            url: {
              twitter: "janesmith",
              youtube: "janesmithchannel",
              instagram: "jane_smith_insta",
            },
          }}
        />
      </div>
    </>
  );
}
