import type { Tables } from "./database.types";

export type CreatorUrls = {
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  [platform: string]: string | undefined;
};

export type Creator = {
  id: number;
  name: string;
  url: CreatorUrls;
  description?: string | null;
  imageUrl?: string | null;
};

export function toCreator(row: Tables<"creators">): Creator {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    imageUrl: row.image_url,
    url: (row.url ?? {}) as CreatorUrls,
  };
}
