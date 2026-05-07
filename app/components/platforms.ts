import {
  YoutubeIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
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
  twitter: {
    label: "Twitter / X",
    buildUrl: (h) => `https://x.com/${h}`,
  },
};

export const MAIN_PLATFORMS = ["youtube", "instagram", "tiktok", "twitter"] as const;

export const PLATFORM_ICONS: Record<string, () => React.ReactElement> = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
};
