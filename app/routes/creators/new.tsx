import { useState } from "react";
import { Form, redirect } from "react-router";
import { createClient } from "~/client";
import { MAIN_PLATFORMS } from "~/components/platforms";
import type { Route } from "./+types/new";
import "./new.scss";

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
  const { data: result, error } = await supabaseClient
    .from("creators")
    .insert({ name, description, image_url: imageUrl, urls: urls })
    .select("id")
    .single();

  if (error || !result) {
    return { error: "Failed to save creator. Please try again." };
  }

  return redirect(`/${result.id}`, { headers });
}

type CustomUrl = { platform: string; handle: string };

export default function AddCreator({ actionData }: Route.ComponentProps) {
  const [customUrls, setCustomUrls] = useState<CustomUrl[]>([]);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [descriptionInvalid, setDescriptionInvalid] = useState(false);

  function addCustomUrl() {
    setCustomUrls((prev) => [...prev, { platform: "", handle: "" }]);
  }

  function removeCustomUrl(index: number) {
    setCustomUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function updateCustomUrl(
    index: number,
    field: keyof CustomUrl,
    value: string,
  ) {
    setCustomUrls((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <div className="creator-form">
      <h1>Add a Creator</h1>

      {actionData?.error && (
        <p className="creator-form-error" role="alert">
          {actionData.error}
        </p>
      )}

      <Form method="post">
        <input
          type="hidden"
          name="customUrls"
          value={JSON.stringify(customUrls)}
        />

        <label>
          Name<span className="creator-form-required">*</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Creator name"
            aria-invalid={nameInvalid || undefined}
            onBlur={(e) => setNameInvalid(e.target.value.trim() === "")}
          />
          <small id="invalid-helper" className={nameInvalid ? "" : "hidden"}>
            Name is required.
          </small>
        </label>

        <label>
          Description<span className="creator-form-required">*</span>
          <textarea
            name="description"
            rows={4}
            placeholder="Tell us about the creator..."
            required
            aria-invalid={descriptionInvalid || undefined}
            onBlur={(e) => setDescriptionInvalid(e.target.value.trim() === "")}
          />
          <small id="invalid-helper" className={descriptionInvalid ? "" : "hidden"}>
            Description is required.
          </small>
        </label>

        <label>
          Image URL
          <input
            name="imageUrl"
            type="url"
            placeholder="https://example.com/photo.jpg"
          />
        </label>

        <fieldset>
          <legend>
            Social Media<span className="creator-form-required">*</span>{" "}
            <span className="creator-form-legend-hint">
              At least 1 social media link must be provided.
            </span>
          </legend>
          <label>
            YouTube
            <input
              name="youtube"
              type="text"
              placeholder="handle (without the @)"
            />
          </label>
          <label>
            Instagram
            <input
              name="instagram"
              type="text"
              placeholder="handle (without the @)"
            />
          </label>
          <label>
            Twitter
            <input
              name="twitter"
              type="text"
              placeholder="handle (without the @)"
            />
          </label>
          <label>
            TikTok
            <input
              name="tiktok"
              type="text"
              placeholder="handle (without the @)"
            />
          </label>
        </fieldset>

        {customUrls.length > 0 && (
          <fieldset>
            <legend>Custom Links</legend>
            {customUrls.map((item, index) => (
              <div key={index} className="creator-form-custom-row">
                <input
                  type="text"
                  placeholder="Platform name"
                  value={item.platform}
                  onChange={(e) =>
                    updateCustomUrl(index, "platform", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Handle or URL"
                  value={item.handle}
                  onChange={(e) =>
                    updateCustomUrl(index, "handle", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="outline secondary"
                  onClick={() => removeCustomUrl(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </fieldset>
        )}

        <button type="button" className="outline" onClick={addCustomUrl}>
          + Add Custom Link
        </button>

        <div className="creator-form-actions">
          <button type="submit">Save Creator</button>
        </div>
      </Form>
    </div>
  );
}
