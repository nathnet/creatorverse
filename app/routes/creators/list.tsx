import CreatorCard from "~/components/CreatorCard";

export function meta() {
  return [{ title: "Creators" }];
}

export default function ShowCreators() {
  return (
    <>
      <h1>Creators</h1>
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
