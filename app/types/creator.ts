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
