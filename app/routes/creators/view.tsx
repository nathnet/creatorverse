import { Link } from "react-router";
import type { Route } from "./+types/view";
import "./view.scss";
import { type Creator, toCreator } from "~/types/creator.types";
import {
  MAIN_PLATFORMS,
  PLATFORM_CONFIG,
  PLATFORM_ICONS,
} from "~/components/platforms";
import { createClient } from "~/client";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `Creatorverse: ${loaderData.creator.name}` }];
}

export async function loader({
  params,
  request,
}: Route.LoaderArgs): Promise<{ creator: Creator }> {
  const id = Number(params.id);
  const result = await createClient(request)
    .supabaseClient.from("creators")
    .select()
    .eq("id", id)
    .single();

  if (result.error || !result.data) {
    throw new Response("Creator not found", { status: 404 });
  }

  return { creator: toCreator(result.data) };
}

export default function ViewCreator({ loaderData }: Route.ComponentProps) {
  const { creator } = loaderData;

  const allLinks = [
    ...(MAIN_PLATFORMS as readonly string[])
      .filter((platform) => Boolean(creator.urls[platform]))
      .map((platform) => ({ platform: platform, handle: creator.urls[platform] as string })),
    ...Object.entries(creator.urls)
      .filter(
        ([platform, handle]) =>
          !(MAIN_PLATFORMS as readonly string[]).includes(platform) && Boolean(handle),
      )
      .map(([platform, handle]) => ({ platform: platform, handle: handle as string })),
  ];

  return (
    <div className="creator-view">
      <div className="creator-view-image">
        {creator.imageUrl ? (
          <img src={creator.imageUrl} alt={creator.name} />
        ) : (
          <div className="creator-view-avatar">
            <span aria-hidden="true">
              {creator.name.trim().charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="creator-view-content">
        <div className="creator-view-header">
          <h1>{creator.name}</h1>
          <Link to={`/${creator.id}/edit`} role="button" className="outline">
            Edit
          </Link>
        </div>

        {creator.description && (
          <p className="creator-view-description">{creator.description}</p>
        )}

        {allLinks.length > 0 && (
          <section className="creator-view-links">
            <h3>Social Media</h3>
            <ul>
              {allLinks.map(({ platform, handle }) => {
                const config = PLATFORM_CONFIG[platform];
                const Icon = PLATFORM_ICONS[platform];
                const label = config
                  ? config.label
                  : platform.charAt(0).toUpperCase() + platform.slice(1);
                const href = config
                  ? config.buildUrl(handle)
                  : handle.startsWith("http")
                    ? handle
                    : undefined;
                return (
                  <li key={platform}>
                    <span className="creator-view-platform-label">
                      {Icon && (
                        <span className="creator-view-link-icon">
                          <Icon />
                        </span>
                      )}
                      {label}:
                    </span>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {handle}
                      </a>
                    ) : (
                      <span>{handle}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
