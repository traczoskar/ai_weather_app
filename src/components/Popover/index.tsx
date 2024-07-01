import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface PopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  anchorEl,
  open,
  onClose,
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open || !anchorEl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      ref={popoverRef}
      aria-label="Popover"
      className="flex items-center justify-center z-50 absolute top-16 lg:top-24 text-[10px] sm:text-xs right-2 lg:-right-6 bg-sky-100 border-sky-300 text-sky-800 dark:bg-sky-300 border dark:border-sky-400 dark:text-sky-700 shadow-lg rounded-full px-4 py-2"
    >
      {children}
    </motion.div>
  );
};

export default Popover;
