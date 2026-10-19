import { site } from "@/content/site";
import { WhatsAppIcon } from "./ui/icons";

/** Only renders once a WhatsApp number is set in site.ts. */
export default function FloatingWhatsApp() {
  const n = (site.contact.whatsapp[0] ?? "").replace(/\D/g, "");
  if (!n) return null;
  return (
    <a
      href={`https://wa.me/${n}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
