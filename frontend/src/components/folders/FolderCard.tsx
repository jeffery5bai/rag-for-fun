import Link from "next/link";
import type { Folder } from "@/types/folders";

// 在没有指定颜色时使用的默认颜色列表
const DEFAULT_COLORS = [
  "bg-primary-300",
  "bg-info-300",
  "bg-success-300", 
  "bg-warning-300",
  "bg-accent-300",
];

export interface FolderCardProps {
  folder: Folder;
}

export function FolderCard({ folder }: FolderCardProps) {
  // 如果没有指定颜色，则根据ID生成一个稳定的颜色
  const colorIndex = !folder.coverColor 
    ? parseInt(folder.id.substring(0, 8), 16) % DEFAULT_COLORS.length
    : 0;
  const bgColor = folder.coverColor || DEFAULT_COLORS[colorIndex];
  
  return (
    <Link 
      href={`/folders/${folder.id}`}
      className="block group"
    >
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-ring/50 w-full h-[280px]">
        {/* 顶部图标区域 */}
        <div className={`h-[160px] ${bgColor} relative`}>
          <div className="absolute top-4 left-4 text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
              />
            </svg>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-4 h-[120px] flex flex-col">
          <h3 className="font-medium text-xl mb-1 text-foreground truncate">
            {folder.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 h-12 overflow-hidden">
            {folder.description || "無描述"}
          </p>
          
          <div className="flex justify-between text-sm text-muted-foreground mt-auto">
            <span>{folder.documentsCount} 個文檔</span>
            <span>
              {new Date(folder.updatedAt).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 