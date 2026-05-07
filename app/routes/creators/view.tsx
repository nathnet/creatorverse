import { Link } from "react-router";
import type { Route } from "./+types/view";
import "./view.scss";
import type { Creator } from "~/types/creator";
import {
  MAIN_PLATFORMS,
  PLATFORM_CONFIG,
  PLATFORM_ICONS,
} from "~/components/platforms";

const MOCK_CREATOR: Creator = {
  id: 911,
  name: "Jane Smith",
  description:
    "A sample creator for demonstration purposes, but this one is probably a little bit longer than normal and is likely going to overflow. This is how it should be though. Longer than 3 lines are just going to push into someone else's card.",
  imageUrl:
    "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Jane-Smith.Mr-and-Mrs-Smith.webp",
  url: {
    youtube: "janesmithchannel",
    instagram: "jane_smith_insta",
    tiktok: "janesmith",
    twitter: "janesmith_twitter",
    website: "https://janesmith.example.com",
  },
};

export function meta() {
  return [{ title: "View Creator" }];
}

export default function ViewCreator(_: Route.ComponentProps) {
  const creator = MOCK_CREATOR;

  const allLinks = [
    ...(MAIN_PLATFORMS as readonly string[])
      .filter((p) => Boolean(creator.url[p]))
      .map((p) => ({ platform: p, handle: creator.url[p] as string })),
    ...Object.entries(creator.url)
      .filter(
        ([p, h]) =>
          !(MAIN_PLATFORMS as readonly string[]).includes(p) && Boolean(h),
      )
      .map(([p, h]) => ({ platform: p, handle: h as string })),
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
                      {label}
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
