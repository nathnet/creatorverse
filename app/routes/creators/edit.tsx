import type { Route } from "./+types/edit";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Edit Creator" }];
}

export default function EditCreator() {
  return <h1>Edit Creator</h1>;
}
