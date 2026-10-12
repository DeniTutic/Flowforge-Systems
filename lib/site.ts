/**
 * Public address and contact details in one place.
 * Flowforge has no custom domain yet – flowforge.systems belongs to a different company,
 * so nothing may fall back to it.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://flowforge-systems.vercel.app";
export const SITE_HOST = new URL(SITE_URL).host;

/** Public contact email (Vercel env NEXT_PUBLIC_CONTACT_EMAIL). Empty = every email link is hidden. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
