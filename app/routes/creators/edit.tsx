import { redirect } from "react-router";
import { createClient } from "~/client";
import { MAIN_PLATFORMS } from "~/components/platforms";
import CreatorForm, { type CustomUrl } from "~/components/CreatorForm";
import { type Creator, toCreator } from "~/types/creator.types";
import type { Route } from "./+types/edit";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `Edit: ${loaderData.creator.name}` }];
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

export async function action({ params, request }: Route.ActionArgs) {
  const id = Number(params.id);
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
  const { error } = await supabaseClient
    .from("creators")
    .update({ name, description, image_url: imageUrl, urls })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    return { error: "Failed to update creator. Please try again." };
  }

  return redirect(`/${id}`, { headers });
}

export default function EditCreator({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { creator } = loaderData;

  return (
    <CreatorForm
      title={`Edit: ${creator.name}`}
      defaultValues={creator}
      actionData={actionData}
      cancelTo={`/${creator.id}`}
      submitLabel="Update Creator"
    />
  );
}
