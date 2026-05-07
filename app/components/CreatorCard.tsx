import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Creator } from "~/types/creator";
import {
  MAIN_PLATFORMS,
  PLATFORM_CONFIG,
  PLATFORM_ICONS,
} from "~/components/platforms";
import "./CreatorCard.scss";

export type { Creator };

export default function CreatorCard({ creator }: { creator: Creator }) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const description = descRef.current;
    if (!description) return;

    setIsClamped(description.scrollHeight > description.clientHeight);
  }, [creator.description]);

  const mainLinks = (MAIN_PLATFORMS as readonly string[])
    .map((p) => ({ platform: p, handle: creator.url[p] }))
    .filter((entry): entry is { platform: string; handle: string } =>
      Boolean(entry.handle),
    );

  return (
    <article className="creator-card">
      {creator.imageUrl ? (
        <div className="creator-card-cover">
          <img src={creator.imageUrl} alt={creator.name} />
        </div>
      ) : (
        <div className="creator-card-avatar">
          <span aria-hidden="true">
            {creator.name.trim().charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="creator-card-body">

        <div>
          <h3>{creator.name}</h3>
          {creator.description && (
            <div className="creator-card-desc">
              <p ref={descRef}>{creator.description}</p>
              {isClamped && (
                <Link to={`/${creator.id}`} className="creator-card-read-more">
                  Read more →
                </Link>
              )}
            </div>
          )}
        </div>

        <footer className="creator-card-footer">
          <div className="creator-card-platforms">
            {mainLinks.map(({ platform, handle }) => {
              const Icon = PLATFORM_ICONS[platform];
              const { label, buildUrl } = PLATFORM_CONFIG[platform];
              return (
                <a
                  key={platform}
                  href={buildUrl(handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="creator-card-icon-btn"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <div className="creator-card-actions">
            <Link to={`/${creator.id}`} role="button" className="outline">
              View
            </Link>
            <Link
              to={`/${creator.id}/edit`}
              role="button"
              className="outline secondary"
            >
              Edit
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
