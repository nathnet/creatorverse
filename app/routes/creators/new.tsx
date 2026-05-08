import { redirect } from "react-router";
import { createClient } from "~/client";
import { MAIN_PLATFORMS } from "~/components/platforms";
import CreatorForm, { type CustomUrl } from "~/components/CreatorForm";
import type { Route } from "./+types/new";

export function meta() {
  return [{ title: "Add a New Creator" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = (formData.get("name") as string | null)?.trim();

  if (!name) {
    return { error: "Name is required." };
  }

  const description =
    (formData.get("description") as string | null)?.trim() || null;

  if (!description) {
    return { error: "Description is required." };
  }

  const imageUrl = (formData.get("imageUrl") as string | null)?.trim() || null;

  const urls: Record<string, string> = {};
  for (const platform of MAIN_PLATFORMS) {
    const handle = (formData.get(platform) as string | null)?.trim();
    if (handle) urls[platform] = handle;
  }

  const customUrlsRaw = formData.get("customUrls") as string | null;
  if (customUrlsRaw) {
    const customUrls = JSON.parse(customUrlsRaw) as CustomUrl[];
    for (const { platform, handle } of customUrls) {
      const normalizedPlatform = platform.trim().toLowerCase();
      const normalizedHandle = handle.trim();
      if (normalizedPlatform && normalizedHandle) {
        urls[normalizedPlatform] = normalizedHandle;
      }
    }
  }

  if (Object.keys(urls).length === 0) {
    return { error: "At least one social media link is required." };
  }

  const { supabaseClient, headers } = createClient(request);
  const { data, error } = await supabaseClient
    .from("creators")
    .insert({ name, description, image_url: imageUrl, urls })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Failed to save creator. Please try again." };
  }

  return redirect(`/${data.id}`, { headers });
}

export default function AddCreator({ actionData }: Route.ComponentProps) {
  return (
    <CreatorForm
      title="Add a Creator"
      actionData={actionData}
      cancelTo=".."
      submitLabel="Add Creator"
    />
  );
}
