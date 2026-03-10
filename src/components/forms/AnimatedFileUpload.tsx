import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File as FileIcon, X, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AnimatedFileUploadProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  onFileSelect?: (file: File) => void;
  maxSizeMB?: number;
}

export function AnimatedFileUpload({
  label,
  error,
  description,
  wrapperClassName,
  onFileSelect,
  maxSizeMB = 5,
}: AnimatedFileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setLocalError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }
    setLocalError(null);
    setFile(selectedFile);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onFileSelect) onFileSelect(selectedFile);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setLocalError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <AnimatedFormGroup
      label={label}
      error={error || localError || undefined}
      description={description}
      className={wrapperClassName}
    >
      <div
        className={cn(
          "relative mt-2 flex flex-col items-center p-6 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border bg-card hover:bg-muted/50 hover:border-muted-foreground/50",
          error || localError ? "border-destructive bg-destructive/5" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          accept="image/*,application/pdf"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-3 pointer-events-none"
            >
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or PDF (max. {maxSizeMB}MB)</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file-info"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex items-center justify-between p-2 rounded-lg border bg-background shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 bg-primary/10 rounded text-primary shrink-0">
                  <FileIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 shrink-0">
                {uploadProgress === 100 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-500"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>
                ) : null}
                <button
                  onClick={removeFile}
                  className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {file && uploadProgress < 100 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="w-full mt-4"
          >
            <Progress value={uploadProgress} className="h-1.5" />
            <p className="text-right text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
          </motion.div>
        )}
      </div>
    </AnimatedFormGroup>
  );
}
