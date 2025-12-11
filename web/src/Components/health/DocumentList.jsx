import React from "react";
import { Download, File } from "lucide-react";

const DocumentList = ({ documents }) => {
  if (!documents || documents.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Documentos adjuntos
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {documents.length} archivo{documents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-3">
          {documents.map((url, index) => {
            const fileName = url.split("/").pop() || `documento-${index + 1}`;
            const fileExtension =
              fileName.split(".").pop()?.toLowerCase() || "file";
            const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
              fileExtension
            );
            const isPDF = fileExtension === "pdf";

            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all group hover:border-gray-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isImage ? "bg-blue-50" : isPDF ? "bg-red-50" : "bg-gray-50"
                  }`}
                >
                  {isImage ? (
                    <div className="text-blue-500">🖼️</div>
                  ) : isPDF ? (
                    <div className="text-red-500">📄</div>
                  ) : (
                    <File className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate mb-1">
                    {fileName}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-3">
                    <span className="uppercase bg-gray-100 px-2 py-0.5 rounded text-xs">
                      {fileExtension}
                    </span>
                    <span className="text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                      Ver documento
                      <Download className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-400">#{index + 1}</div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
