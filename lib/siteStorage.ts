/** Client-side localStorage keys (used by NewsletterPopup, CookieConsent). */
export const STORAGE = {
  newsletterSubscribed: "flowforge_newsletter_subscribed_v1",
  newsletterSessionDismissed: "flowforge_newsletter_dismissed_session_v1",
  cookieConsent: "flowforge_cookie_consent_v1",
} as const;

export type CookieConsentRecord = {
  choice: "accepted" | "declined";
  at: number;
};
