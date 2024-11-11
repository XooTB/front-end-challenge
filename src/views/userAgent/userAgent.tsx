"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { useUserAgentContext } from "@/components/providers/userAgentProvider";

type UserAgentProps = {
  fallbackUserAgent?: string;
};

export const UserAgent = ({ fallbackUserAgent }: UserAgentProps) => {
  const { userAgent } = useUserAgentContext();
  const displayUserAgent = userAgent || fallbackUserAgent;

  return (
    <div>
      <BackToHome />

      {displayUserAgent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>
          <div className="border p-2">{displayUserAgent}</div>
        </div>
      )}

      {!displayUserAgent && <div>No user agent</div>}
    </div>
  );
};
