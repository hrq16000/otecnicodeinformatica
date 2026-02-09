import { SocialProofNotification } from "./SocialProofNotification";
import { ScarcityIndicator } from "./ScarcityIndicator";
import { ExitIntentPopup } from "./ExitIntentPopup";

/**
 * Main provider component that includes all social proof elements.
 * Add this to your app layout to enable social proof features.
 * 
 * Features:
 * - Activity notifications (CDC-compliant)
 * - Scarcity indicators
 * - Exit intent popup (desktop only)
 * 
 * All features can be toggled via useSocialProofSettings hook.
 */
export const SocialProofProvider = () => {
  return (
    <>
      <SocialProofNotification />
      <ScarcityIndicator />
      <ExitIntentPopup />
    </>
  );
};
