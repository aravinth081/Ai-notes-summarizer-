"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Sparkles,
  File,
  Image,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatFileSize } from "@/lib/utils";
import { toast } from "sonner";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "processing" | "done" | "error";
}

const fileTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  docx: File,
  doc: File,
  pptx: FileSpreadsheet,
  ppt: FileSpreadsheet,
  txt: FileText,
  png: Image,
  jpg: Image,
  jpeg: Image,
};

/**
 * File Upload page with drag-and-drop, multi-file support, and progress tracking
 */
export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach((uploadFile) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Simulate processing
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, progress: 100, status: "processing" } : f
            )
          );

          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id ? { ...f, status: "done" } : f
              )
            );
            toast.success(`${uploadFile.file.name} processed successfully!`);
          }, 2000);
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, progress } : f
            )
          );
        }
      }, 300);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "text/plain": [".txt"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    const Icon = fileTypeIcons[ext] || FileText;
    return Icon;
  };

  const completedFiles = files.filter((f) => f.status === "done");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">Upload Notes</h1>
        <p className="text-muted-foreground mt-1">
          Upload your study materials and let AI transform them into exam-ready content
        </p>
      </motion.div>

      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          {...getRootProps()}
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border/60 hover:border-primary/50 hover:bg-accent/30"
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className={`p-4 rounded-2xl mb-4 transition-colors ${
                isDragActive
                  ? "bg-primary/10"
                  : "bg-muted group-hover:bg-primary/10"
              }`}
            >
              <Cloud
                className={`h-10 w-10 transition-colors ${
                  isDragActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                }`}
              />
            </motion.div>

            <h3 className="text-lg font-semibold mb-1">
              {isDragActive ? "Drop your files here" : "Drag & drop your notes"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse from your computer
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {["PDF", "DOCX", "PPTX", "TXT", "PNG", "JPG"].map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  .{type.toLowerCase()}
                </Badge>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-3">Max file size: 50MB</p>
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Uploads ({files.length})
                  </span>
                  {completedFiles.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {completedFiles.length} ready
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {files.map((uploadFile) => {
                  const FileIcon = getFileIcon(uploadFile.file.name);
                  return (
                    <motion.div
                      key={uploadFile.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-muted/20"
                    >
                      <div className="p-2 rounded-lg bg-muted shrink-0">
                        <FileIcon className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {uploadFile.file.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(uploadFile.file.size)}
                          </span>
                          {uploadFile.status === "uploading" && (
                            <span className="text-xs text-blue-400">
                              Uploading {Math.round(uploadFile.progress)}%
                            </span>
                          )}
                          {uploadFile.status === "processing" && (
                            <span className="text-xs text-amber-400 flex items-center gap-1">
                              <Sparkles className="h-3 w-3 animate-pulse" />
                              Processing with AI...
                            </span>
                          )}
                          {uploadFile.status === "done" && (
                            <span className="text-xs text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Ready
                            </span>
                          )}
                          {uploadFile.status === "error" && (
                            <span className="text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Failed
                            </span>
                          )}
                        </div>
                        {(uploadFile.status === "uploading" || uploadFile.status === "processing") && (
                          <Progress
                            value={uploadFile.status === "processing" ? 100 : uploadFile.progress}
                            className="h-1 mt-2"
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {uploadFile.status === "done" && (
                          <Link href={`/notes/${uploadFile.id}`}>
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                              <Sparkles className="h-3 w-3" />
                              Open
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeFile(uploadFile.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
