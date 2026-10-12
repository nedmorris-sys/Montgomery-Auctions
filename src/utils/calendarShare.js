// Calendar & Social Event Sharing utilities

export function createGoogleCalendarUrl(event) {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(
    `${event.description}\n\nPrincipal Auctioneer: John Montgomery\nMontgomery's Premier Auction Group\nLots: ${event.lotCount}\nVenue: ${event.location}`
  );
  const location = encodeURIComponent(event.venueAddress || event.location);

  // Parse ISO date
  const startDate = new Date(event.isoDateTime || `${event.date}T14:00:00Z`);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4-hour duration

  const formatTime = (date) =>
    date.toISOString().replace(/-|:|\.\d+/g, '');

  const dates = `${formatTime(startDate)}/${formatTime(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event) {
  const startDate = new Date(event.isoDateTime || `${event.date}T14:00:00Z`);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const formatIcsDate = (date) =>
    date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Montgomery Premier Auction Group//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-${Date.now()}@montgomeryauctiongroup.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${event.title.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}\\n\\nPrincipal Auctioneer: John Montgomery\\nContact: john.montgomery@montgomeryauctiongroup.com`,
    `LOCATION:${(event.venueAddress || event.location).replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-montgomery-auction.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getShareUrls(event) {
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?tab=upcoming&auction=${event.id}` : 'https://montgomeryauctiongroup.com';
  const shareText = encodeURIComponent(`Check out ${event.title} presented by Montgomery's Premier Auction Group!`);
  const encodedUrl = encodeURIComponent(shareUrl);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(`Take a look at this upcoming auction by Montgomery's Premier Auction Group:\n\n${event.title}\nDate: ${event.date} at ${event.time}\nLocation: ${event.location}\n\nCatalog & Simulcast Details: ${shareUrl}`)}`,
    directLink: shareUrl
  };
}
