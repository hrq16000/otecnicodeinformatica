import { useCallback, useEffect } from "react";

/**
 * Modo escuro foi descontinuado por questões de contraste/legibilidade.
 * Mantemos o hook como no-op para preservar a API dos componentes existentes
 * sem precisar refatorar todos os call-sites. Garantimos que a classe `.dark`
 * nunca fique aplicada (mesmo que esteja persistida no localStorage).
 */
export function useDarkMode() {
  useEffect(() => {
    try {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } catch {
      /* noop */
    }
  }, []);

  const toggle = useCallback(() => {
    /* no-op: dark mode removido */
  }, []);

  return { isDark: false, toggle };
}
