import React from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Download {
  id: string;
  name: string;
  type: "pdf" | "project";
  downloadDate: string;
  fileSize: string;
}

// Mock data - replace with actual API call
const downloads: Download[] = [
  {
    id: "DL-001",
    name: "Arduino Project Documentation",
    type: "pdf",
    downloadDate: "2024-01-15",
    fileSize: "2.5 MB",
  },
  {
    id: "DL-002",
    name: "IoT Project Files",
    type: "project",
    downloadDate: "2024-01-20",
    fileSize: "15 MB",
  },
];

export default function DownloadsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Downloads</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Download Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Size
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.type === "pdf" ? (
                        <FileText className="h-5 w-5 text-red-500 mr-2" />
                      ) : (
                        <Download className="h-5 w-5 text-blue-500 mr-2" />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.downloadDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.fileSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Again
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
