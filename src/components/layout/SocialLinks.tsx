import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

/* Ícones de marca (lucide não distribui logos de terceiros). */
function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.6 2.59 2.59 0 0 1 3.4-2.47V9.66a5.72 5.72 0 0 0-.81-.06A5.73 5.73 0 0 0 4.13 15.3 5.73 5.73 0 0 0 9.86 21a5.73 5.73 0 0 0 5.73-5.73V9.05a7.4 7.4 0 0 0 4.29 1.37V7.33a4.3 4.3 0 0 1-3.28-1.51Z" />
    </svg>
  );
}

function YouTube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function Facebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const links = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "TikTok", href: site.social.tiktok, Icon: TikTok },
  { label: "YouTube", href: site.social.youtube, Icon: YouTube },
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
];

export function SocialLinks({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn(
              "flex items-center justify-center rounded-full border border-line bg-asphalt-700 text-foreground/70 transition-all duration-200 ease-out-expo hover:border-white/30 hover:text-foreground",
              size === "sm" ? "h-9 w-9" : "h-10 w-10",
            )}
          >
            <Icon className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
