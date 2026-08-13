// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { SchedulingModal } from "./SchedulingModal";
import { cn } from "@/lib/utils";

interface SchedulingButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  initialService?: string;
  children?: React.ReactNode;
}

export const SchedulingButton = ({
  variant = "default",
  size = "default",
  className,
  initialService,
  children,
}: SchedulingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn(className)}
        onClick={() => setIsOpen(true)}
      >
        {children || (
          <>
            <CalendarDays className="mr-2 h-4 w-4" />
            Agendar Atendimento
          </>
        )}
      </Button>
      <SchedulingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialService={initialService}
      />
    </>
  );
};
