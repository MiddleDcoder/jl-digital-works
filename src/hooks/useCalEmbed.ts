import { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";

/**
 * Deferred Cal.com embed loader.
 * Instead of loading the heavy Cal SDK immediately on mount,
 * this waits until the browser is idle (or 3s timeout) to avoid
 * blocking LCP / FCP.
 */
export const useCalEmbed = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const init = async () => {
      if (initialized.current) return;
      initialized.current = true;
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (error) {
        // Cal.com embed may fail in iframe/preview environments - silently ignore
        if (import.meta.env.DEV) {
          console.warn("Cal.com embed failed to initialize:", error);
        }
      }
    };

    // Defer until browser is idle to avoid blocking LCP
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => init(), { timeout: 4000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => init(), 3000);
      return () => clearTimeout(timer);
    }
  }, []);
};
