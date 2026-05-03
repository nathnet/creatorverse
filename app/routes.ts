import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/creators/list.tsx"),
  route("new", "routes/creators/new.tsx"),
  route(":id", "routes/creators/view.tsx"),
  route(":id/edit", "routes/creators/edit.tsx"),
] satisfies RouteConfig;
