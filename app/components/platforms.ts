import {
  YoutubeIcon,
  InstagramIcon,
  TikTokIcon,
} from "~/components/PlatformIcons";

export const PLATFORM_CONFIG: Record<
  string,
  { label: string; buildUrl: (handle: string) => string }
> = {
  youtube: {
    label: "YouTube",
    buildUrl: (h) => `https://youtube.com/@${h}`,
  },
  instagram: {
    label: "Instagram",
    buildUrl: (h) => `https://instagram.com/${h}`,
  },
  tiktok: {
    label: "TikTok",
    buildUrl: (h) => `https://tiktok.com/@${h}`,
  },
};

export const MAIN_PLATFORMS = ["youtube", "instagram", "tiktok"] as const;

export const PLATFORM_ICONS: Record<string, () => React.ReactElement> = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};
