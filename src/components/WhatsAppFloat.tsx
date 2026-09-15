import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsappFloat"
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
    >
      <MessageCircle aria-hidden="true" />
      <span>¿Te ayudo?</span>
    </a>
  );
}
