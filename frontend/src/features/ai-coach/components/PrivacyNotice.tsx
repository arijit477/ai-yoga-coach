import React from "react";

interface PrivacyNoticeProps {
  className?: string;
}

export const PrivacyNotice = React.memo(function PrivacyNotice({ className = "" }: PrivacyNoticeProps) {
  return (
    <div className={`rounded-2xl border border-emerald-900/10 bg-emerald-50/60 p-4 text-slate-700 flex items-start gap-3 ${className}`}>
      <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">🔒</span>
      <div className="text-xs leading-relaxed text-slate-600">
        <strong className="text-emerald-900 font-semibold block mb-0.5">Privacy by design.</strong>
        Your camera stays on your device. Nothing is uploaded or stored on our servers for posture analysis. Turning the camera off stops all tracking instantly.
      </div>
    </div>
  );
});
