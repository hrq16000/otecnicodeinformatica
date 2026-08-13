// @ts-nocheck
import { useState, useEffect, useCallback } from "react";

interface SocialProofSettings {
  enabled: boolean;
  showActivityNotifications: boolean;
  showScarcityMessages: boolean;
  showExitIntent: boolean;
  notificationInterval: number; // in seconds
  scarcityDelay: number; // seconds before showing scarcity
}

const STORAGE_KEY = "social_proof_settings";

const DEFAULT_SETTINGS: SocialProofSettings = {
  enabled: true,
  showActivityNotifications: true,
  showScarcityMessages: true,
  showExitIntent: true,
  notificationInterval: 25, // 20-40 seconds range, default 25
  scarcityDelay: 25, // Show after 25 seconds
};

export const useSocialProofSettings = () => {
  const [settings, setSettings] = useState<SocialProofSettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<SocialProofSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleEnabled = useCallback(() => {
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSettings,
    toggleEnabled,
    resetToDefaults,
  };
};

export type { SocialProofSettings };
