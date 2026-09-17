import { AlertTriangle } from "lucide-react";

interface SafetyGuideBannerProps {
  className?: string;
  disclaimerUrl?: string;
}

export function SafetyGuideBanner({
  className = "",
  disclaimerUrl = "https://www.yogaverse.co.nz/Disclaimer",
}: SafetyGuideBannerProps) {
  return (
    <div
      role="alert"
      className={`flex items-center gap-3 rounded-lg sm:rounded-xl border border-[#cca044]/90 bg-[#fffcf5] px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-[#54432a] shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${className}`}
      style={{ fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" }}
    >
      <AlertTriangle
        className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-[#cca044] shrink-0"
        aria-hidden="true"
      />
      <p className="leading-snug sm:leading-relaxed">
        Practise within your limits. If you have a health condition, are pregnant, or feel pain or difficulty in any pose, stop and seek medical advice.{" "}
        <a
          href={disclaimerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#b87314] underline underline-offset-2 hover:text-[#8f5208] transition-colors"
        >
          Health &amp; safety disclaimer.
        </a>
      </p>
    </div>
  );
}
