import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { motion } from "framer-motion";

interface AnimatedQRCodeProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

export function AnimatedQRCode({
  label,
  error,
  description,
  wrapperClassName,
  value,
  size = 128,
  bgColor = "#ffffff",
  fgColor = "#000000",
}: AnimatedQRCodeProps) {
  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <div className="mt-2 flex justify-center p-4 border rounded-xl bg-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="p-2 bg-background rounded-lg shadow-sm"
        >
          {value ? (
            <QRCodeSVG value={value} size={size} bgColor={bgColor} fgColor={fgColor} level="Q" />
          ) : (
            <div 
              style={{ width: size, height: size }} 
              className="flex items-center justify-center bg-gray-100 border border-dashed rounded text-xs text-gray-400 text-center p-2"
            >
              Enter text to generate QR
            </div>
          )}
        </motion.div>
      </div>
    </AnimatedFormGroup>
  );
}
