import React from 'react';

export default function WhatsAppIcon({ className = "w-4 h-4", alt = "WhatsApp" }) {
  return (
    <img
      src="/assets/whatsapp-icon.webp"
      alt={alt}
      className={`inline-block object-contain flex-shrink-0 ${className}`}
      loading="lazy"
    />
  );
}
