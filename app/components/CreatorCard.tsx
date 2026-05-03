type Creator = {
  id: string;
  name: string;
};

export default function CreatorCard({ creator }: { creator: Creator }) {
  return <div>{creator.name}</div>;
}
