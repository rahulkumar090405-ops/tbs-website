import { WHATSAPP_NUMBER } from '../data/menuData';

/**
 * Builds dynamic WhatsApp order link for any cake product
 * @param {Object} params
 * @param {string} params.cakeName - Name of the cake
 * @param {string} [params.size] - Selected size (Half KG / Full KG / Half Loaf / etc.)
 * @param {boolean} [params.isHeartShape] - True if heart shape is selected (+₹50)
 * @param {number} params.totalPrice - Calculated price in INR
 * @param {string} [params.category] - Product category
 * @param {string} [params.notes] - Any custom message or instructions
 * @returns {string} WhatsApp URL with pre-filled message
 */
export function createWhatsAppOrderLink({
  cakeName,
  size,
  isHeartShape = false,
  totalPrice,
  category,
  notes = "",
}) {
  let message = `Hello The Baking Spot! I would like to order:\n\n`;
  message += `🍰 Cake: ${cakeName}\n`;

  if (category) {
    message += `🏷️ Category: ${category}\n`;
  }

  if (size) {
    message += `⚖️ Size: ${size}\n`;
  }

  if (isHeartShape) {
    message += `❤️ Shape: Heart (+₹50)\n`;
  }

  message += `💰 Price: ₹${totalPrice}\n`;

  if (notes && notes.trim().length > 0) {
    message += `✍️ Message/Notes: ${notes.trim()}\n`;
  }

  message += `\nPlease share the availability and delivery details.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Custom cake order discussion link
 */
export function createCustomCakeWhatsAppLink(customDetails = {}) {
  let message = `Hello The Baking Spot! I would like to discuss a custom cake for my celebration.\n\n`;
  
  if (customDetails.flavor) message += `🎂 Preferred Flavour: ${customDetails.flavor}\n`;
  if (customDetails.occasion) message += `🎉 Occasion: ${customDetails.occasion}\n`;
  if (customDetails.weight) message += `⚖️ Estimated Size/Weight: ${customDetails.weight}\n`;
  if (customDetails.message) message += `💌 Custom Message/Theme: ${customDetails.message}\n`;

  message += `\nPlease guide me with design options and pricing.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Quick general contact link
 */
export function createGeneralWhatsAppLink() {
  const message = `Hello The Baking Spot! I am browsing your website and would like to inquire about placing an order.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
