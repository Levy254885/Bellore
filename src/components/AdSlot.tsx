import { useEffect, useRef } from "react";

interface Props {
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

/**
 * Google AdSense slot. Replace `data-ad-client` with your publisher ID
 * and configure individual slot IDs in AdSense, then pass `slot` prop.
 * Falls back to a styled placeholder when AdSense script is not loaded.
 */
export default function AdSlot({ slot = "0000000000", format = "auto", className = "", label = "Advertisement" }: Props) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is injected by external script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* no-op when script not loaded */
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center mb-2">{label}</p>
      <div className="relative w-full min-h-[90px] bg-secondary border border-dashed border-border rounded-sm flex items-center justify-center overflow-hidden">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: 90 }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <span className="absolute font-body text-xs text-muted-foreground pointer-events-none">
          Ad space — connect AdSense publisher ID
        </span>
      </div>
    </div>
  );
}
