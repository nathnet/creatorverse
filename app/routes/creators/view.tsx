import type { Route } from "./+types/view";

export function meta(_: Route.MetaArgs) {
  return [{ title: "View Creator" }];
}

export default function ViewCreator() {
  return <h1>View Creator</h1>;
}
