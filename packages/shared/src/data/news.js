/**
 * The announcement above the fold, newest first.
 *
 * A list rather than a pair of translation keys, because the old entry now
 * stays: the badge used to be overwritten whenever there was something newer,
 * which is why nothing on this site ever said when anything happened. Each item
 * carries its own date, and the ticker prints it.
 *
 * `date` is ISO and formatted per language at render time — a written-out
 * German date in an English string is the kind of thing that survives for
 * months. Keep the list short; this is a badge, not a blog.
 */
export const news = [
  {
    id: "ablage",
    date: "2026-08-21",
    href: "https://ablage.le-space.de",
    text: {
      en: "New building block — ablage: a folder that stays the same on two devices. No account, nothing in the middle, and it opens without a network.",
      de: "Neuer Baustein — ablage: ein Ordner, der auf zwei Geräten derselbe bleibt. Kein Konto, nichts dazwischen, und er öffnet sich auch ohne Netz.",
    },
  },
  {
    id: "qr01",
    date: "2026-08-16",
    href: "https://qr01.le-space.de",
    text: {
      en: "New chapter in the Simple Todo P2P PWA tutorial: replication between two smartphones in environments without internet or electricity, over a Wi-Fi hotspot",
      de: "Neues Kapitel im Simple Todo P2P-PWA-Tutorial: Replikation zwischen zwei Smartphones in Umgebungen ohne Internet und Elektrizität, per WLAN-Hotspot",
    },
  },
];

/** The date as that language writes it, not as ISO. */
export function formatNewsDate(iso, code) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(code === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
