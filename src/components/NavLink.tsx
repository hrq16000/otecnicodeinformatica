import { forwardRef, type ComponentProps } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<ComponentProps<typeof Link>, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, end, ...props }, ref) => {
    void pendingClassName; // sem estado "pending" no TanStack Router
    const { pathname } = useLocation();
    const target = (to.split(/[?#]/)[0] || "/").replace(/\/+$/, "") || "/";
    const current = pathname.replace(/\/+$/, "") || "/";
    const isActive =
      end || target === "/"
        ? current === target
        : current === target || current.startsWith(`${target}/`);
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
