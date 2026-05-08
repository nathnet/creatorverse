import { useState } from "react";
import { Form, Link, redirect } from "react-router";
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

export async function action({
  params,
  request,
}: Route.ActionArgs) {
  const id = Number(params.id);
  const { supabaseClient, headers } = createClient(request);

  const { error } = await supabaseClient
    .from("creators")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Response("Failed to delete creator", { status: 500 });
  }

  return redirect("/", { headers });
}

export async function loader({
  params,
  request,
}: Route.LoaderArgs): Promise<{ creator: Creator }> {
  const id = Number(params.id);
  const { data, error } = await createClient(request)
    .supabaseClient.from("creators")
    .select()
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Response("Creator not found", { status: 404 });
  }

  return { creator: toCreator(data) };
}

export default function ViewCreator({ loaderData }: Route.ComponentProps) {
  const { creator } = loaderData;
  const [dialogOpen, setDialogOpen] = useState(false);

  function openDialog() {
    setDialogOpen(true);
    document.documentElement.classList.add("modal-is-open", "modal-is-opening");
    setTimeout(() => document.documentElement.classList.remove("modal-is-opening"), 400);
  }

  function closeDialog() {
    document.documentElement.classList.add("modal-is-closing");
    setTimeout(() => {
      setDialogOpen(false);
      document.documentElement.classList.remove("modal-is-open", "modal-is-closing");
    }, 400);
  }

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
          <div className="creator-view-actions">
            <Link to={`/${creator.id}/edit`} role="button" className="outline">
              Edit
            </Link>
            <button className="outline contrast" onClick={openDialog}>
              Delete
            </button>
          </div>
        </div>

        <Form
          method="delete"
          id="delete-form"
          onSubmit={() =>
            document.documentElement.classList.remove(
              "modal-is-open",
              "modal-is-opening",
              "modal-is-closing",
            )
          }
        />

        <dialog open={dialogOpen}>
          <article>
            <header>
              <button rel="prev" aria-label="Close" onClick={closeDialog} />
              <h3>Delete {creator.name}?</h3>
            </header>
            <p>Are you sure this content creator is no longer worthy of their place here? This action cannot be undone.</p>
            <footer>
              <button className="outline secondary" onClick={closeDialog}>
                Cancel
              </button>
              <button type="submit" form="delete-form" className="contrast">
                Confirm Delete
              </button>
            </footer>
          </article>
        </dialog>

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
