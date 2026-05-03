import type { Route } from "./+types/edit";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Edit Creator" }];
}

export default function EditCreator({ params }: Route.ComponentProps) {
  return <h1>Edit Creator {params.id}</h1>;
}
