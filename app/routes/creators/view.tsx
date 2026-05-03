import type { Route } from "./+types/view";

export function meta(_: Route.MetaArgs) {
  return [{ title: "View Creator" }];
}

export default function ViewCreator({ params }: Route.ComponentProps) {
  return <h1>View Creator {params.id}</h1>;
}
