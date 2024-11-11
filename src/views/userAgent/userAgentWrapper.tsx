import { headers } from "next/headers";
import { UserAgent } from "./userAgent";

export const UserAgentWrapper = () => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || undefined;

  return <UserAgent fallbackUserAgent={userAgent} />;
};
