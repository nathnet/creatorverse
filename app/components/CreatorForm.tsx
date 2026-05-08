import { useEffect, useRef, useState } from "react";
import { Form, Link, useNavigation } from "react-router";
import { MAIN_PLATFORMS } from "~/components/platforms";
import type { Creator } from "~/types/creator.types";
import "./CreatorForm.scss";

export type CustomUrl = { platform: string; handle: string };

type CreatorFormProps = {
  title: string;
  defaultValues?: Creator;
  actionData?: { error: string } | null;
  cancelTo?: string;
  submitLabel?: string;
};

export default function CreatorForm({
  title,
  defaultValues,
  actionData,
  cancelTo,
  submitLabel = "Save",
}: CreatorFormProps) {
  const initialCustomUrls = defaultValues
    ? Object.entries(defaultValues.urls)
        .filter(
          ([platform]) =>
            !(MAIN_PLATFORMS as readonly string[]).includes(platform),
        )
        .map(([platform, handle]): CustomUrl => ({ platform, handle: handle ?? "" }))
    : [];

  const [customUrls, setCustomUrls] = useState<CustomUrl[]>(initialCustomUrls);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [descriptionInvalid, setDescriptionInvalid] = useState(false);

  const navigation = useNavigation();
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (navigation.state === "idle" && actionData?.error) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [navigation.state, actionData?.error]);

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
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  return (
    <div className="creator-form">
      <h1>{title}</h1>

      {actionData?.error && (
        <p ref={errorRef} className="creator-form-error" role="alert">
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
            defaultValue={defaultValues?.name ?? ""}
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
            defaultValue={defaultValues?.description ?? ""}
            aria-invalid={descriptionInvalid || undefined}
            onBlur={(e) => setDescriptionInvalid(e.target.value.trim() === "")}
          />
          <small
            id="invalid-helper"
            className={descriptionInvalid ? "" : "hidden"}
          >
            Description is required.
          </small>
        </label>

        <label>
          Image URL
          <input
            name="imageUrl"
            type="url"
            placeholder="https://example.com/photo.jpg"
            defaultValue={defaultValues?.imageUrl ?? ""}
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
              defaultValue={defaultValues?.urls.youtube ?? ""}
            />
          </label>
          <label>
            Instagram
            <input
              name="instagram"
              type="text"
              placeholder="handle (without the @)"
              defaultValue={defaultValues?.urls.instagram ?? ""}
            />
          </label>
          <label>
            Twitter
            <input
              name="twitter"
              type="text"
              placeholder="handle (without the @)"
              defaultValue={defaultValues?.urls.twitter ?? ""}
            />
          </label>
          <label>
            TikTok
            <input
              name="tiktok"
              type="text"
              placeholder="handle (without the @)"
              defaultValue={defaultValues?.urls.tiktok ?? ""}
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
          {cancelTo && (
            <Link to={cancelTo} role="button" className="outline secondary">
              Cancel
            </Link>
          )}
          <button type="submit">{submitLabel}</button>
        </div>
      </Form>
    </div>
  );
}
