import {
  IconCode,
  IconBrandReact,
  IconDatabase,
  IconBrain,
  IconServer2,
  IconShoppingCart,
  IconBuildingCommunity,
  IconChartBar,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandGithub,
  IconExternalLink,
  IconGitBranch,
  IconPalette,
  IconDeviceMobile,
  IconCloud,
  IconLock,
  IconSettings,
  IconUser,
  IconBriefcase,
  IconStar,
  IconFileText,
  IconTerminal2,
  IconApi,
  IconChartLine,
  IconLayersIntersect,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

/**
 * Static map of icon string keys (as stored in DB) to Tabler icon components.
 * Using a static lookup (not dynamic import) to preserve tree-shaking.
 * Admin form uses a dropdown select — users never type icon names manually.
 */
const iconMap: Record<string, Icon> = {
  // Dev / Tech
  "ti-code": IconCode,
  "ti-brand-react": IconBrandReact,
  "ti-database": IconDatabase,
  "ti-brain": IconBrain,
  "ti-server-2": IconServer2,
  "ti-terminal-2": IconTerminal2,
  "ti-api": IconApi,
  "ti-layers-intersect": IconLayersIntersect,

  // Commerce / Business
  "ti-shopping-cart": IconShoppingCart,
  "ti-briefcase": IconBriefcase,
  "ti-building-community": IconBuildingCommunity,
  "ti-file-text": IconFileText,

  // Data / Analytics
  "ti-chart-bar": IconChartBar,
  "ti-chart-line": IconChartLine,

  // Contact / Social
  "ti-mail": IconMail,
  "ti-phone": IconPhone,
  "ti-map-pin": IconMapPin,
  "ti-brand-linkedin": IconBrandLinkedin,
  "ti-brand-github": IconBrandGithub,
  "ti-external-link": IconExternalLink,
  "ti-git-branch": IconGitBranch,

  // UI / Misc
  "ti-palette": IconPalette,
  "ti-device-mobile": IconDeviceMobile,
  "ti-cloud": IconCloud,
  "ti-lock": IconLock,
  "ti-settings": IconSettings,
  "ti-user": IconUser,
  "ti-star": IconStar,
};

/**
 * Returns the Tabler icon component for a given icon key string.
 * Falls back to IconCode if the key is not found in the map.
 *
 * @example
 * const Icon = getIcon("ti-brand-react");
 * return <Icon size={18} className="text-gold" />;
 */
export function getIcon(name: string): Icon {
  return iconMap[name] ?? IconCode;
}

/**
 * Returns all available icon entries for use in admin dropdown/select.
 */
export function getIconOptions(): Array<{ value: string; label: string }> {
  return Object.keys(iconMap).map((key) => ({
    value: key,
    label: key.replace("ti-", "").replace(/-/g, " "),
  }));
}

export { iconMap };
