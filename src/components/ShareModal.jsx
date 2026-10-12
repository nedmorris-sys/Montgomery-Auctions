import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { 
  X, 
  Calendar, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Mail, 
  ExternalLink 
} from 'lucide-react';
import { createGoogleCalendarUrl, downloadIcsFile, getShareUrls } from '../utils/calendarShare';

export default function ShareModal() {
  const { shareAuctionModal, setShareAuctionModal, showToast } = useAuction();
  const [copied, setCopied] = React.useState(false);

  if (!shareAuctionModal) return null;

  const event = shareAuctionModal;
  const shareUrls = getShareUrls(event);
  const googleCalUrl = createGoogleCalendarUrl(event);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrls.directLink);
    setCopied(true);
    showToast("Auction link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShareAuctionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Calendar & Sharing</span>
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-white pr-8">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400">
            {event.date} at {event.time} &bull; {event.location}
          </p>
        </div>

        {/* Calendar Integration Section */}
        <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
            Add to Your Calendar
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 hover:border-amber-500/50 transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <button
              onClick={() => {
                downloadIcsFile(event);
                showToast("Downloaded .ics calendar file!");
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 hover:border-amber-500/50 transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>iCal / Outlook (.ics)</span>
            </button>
          </div>
        </div>

        {/* Social Sharing Section */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
            Share with Colleagues & Network
          </span>
          
          <div className="grid grid-cols-4 gap-2 text-xs">
            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-lg bg-blue-950/60 hover:bg-blue-900 border border-blue-800 text-blue-200 font-semibold text-center transition-colors truncate"
            >
              Facebook
            </a>
            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-200 font-semibold text-center transition-colors truncate"
            >
              X / Twitter
            </a>
            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 font-semibold text-center transition-colors truncate"
            >
              LinkedIn
            </a>
            <a
              href={shareUrls.email}
              className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-center transition-colors flex items-center justify-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
        </div>

        {/* Copy Direct Link */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <label className="text-xs text-slate-400">Direct Web Link:</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrls.directLink}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
