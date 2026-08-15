import { useState } from "react";
import { Settings, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSocialProofSettings } from "@/hooks/useSocialProofSettings";
import { cn } from "@/lib/utils";

/**
 * Admin panel for controlling social proof settings.
 * Accessible via keyboard shortcut: Ctrl + Shift + P
 * Or by clicking the settings icon (only visible in development)
 */
export const SocialProofAdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, resetToDefaults } = useSocialProofSettings();

  // Keyboard shortcut to open panel
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    });
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1 left-1 z-[100] p-1 rounded opacity-[0.03] hover:opacity-40 transition-opacity duration-500"
        aria-label="Abrir painel de configurações"
        title="Ctrl+Shift+P"
      >
        <Settings className="h-3 w-3 text-muted-foreground" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[100]"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-[101] w-80",
          "bg-card border border-border rounded-xl shadow-2xl",
          "animate-in slide-in-from-bottom-4 fade-in duration-200"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Configurações de Prova Social</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Master toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Sistema ativo</label>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSettings({ enabled: checked })}
            />
          </div>

          <hr className="border-border" />

          {/* Individual toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">Notificações de atividade</label>
              <Switch
                checked={settings.showActivityNotifications}
                onCheckedChange={(checked) =>
                  updateSettings({ showActivityNotifications: checked })
                }
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm">Indicadores de escassez</label>
              <Switch
                checked={settings.showScarcityMessages}
                onCheckedChange={(checked) =>
                  updateSettings({ showScarcityMessages: checked })
                }
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm">Popup de saída (desktop)</label>
              <Switch
                checked={settings.showExitIntent}
                onCheckedChange={(checked) =>
                  updateSettings({ showExitIntent: checked })
                }
                disabled={!settings.enabled}
              />
            </div>
          </div>

          <hr className="border-border" />

          {/* Reset button */}
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Restaurar padrões
          </Button>
        </div>

        <div className="p-3 bg-muted/50 rounded-b-xl">
          <p className="text-[10px] text-muted-foreground text-center">
            Configurações salvas localmente. Atalho: Ctrl+Shift+P
          </p>
        </div>
      </div>
    </>
  );
};
