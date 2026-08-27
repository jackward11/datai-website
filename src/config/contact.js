export const contact = {
  email: 'hello@datai.software',
  whatsappContacts: [
    { name: 'Jack', number: '447825885167' },
    { name: 'Gulenoor', number: '4915567036190' },
  ],
  whatsappDiscoveryMessage:
    'Hi, I would like to book a free 30-minute workflow audit. Can we find a time to chat?',
  whatsappPartnerMessage:
    'Hi, I am interested in partnering with you on AI automations. Can we talk?',
}

export function whatsappUrl(message, number = contact.whatsappContacts[0].number) {
  return `https://wa.me/${String(number).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
