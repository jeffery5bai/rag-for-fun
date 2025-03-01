import { FolderCard } from "@/components/folders/FolderCard";
import { mockFolders } from "@/data/mockFolders";

export default function FoldersPage() {
  // 在实际应用中，这里会从API获取数据
  const folders = mockFolders;
  // 可以通过设置为空数组来测试空状态: const folders = [];
  
  return (
    <div>
      {/* 顶部操作栏 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">我的資料夾</h1>
        
        <button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow-sm hover:bg-primary/90 transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
          新建資料夾
        </button>
      </div>
      
      {/* 文件夹列表或空状态 */}
      {folders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border rounded-lg bg-muted/20">
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-muted mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-muted-foreground" 
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
          <h3 className="text-xl font-medium text-foreground mb-2">沒有任何資料夾</h3>
          <p className="text-muted-foreground text-center mb-6">
            請點擊上方&ldquo;新建資料夾&rdquo;按鈕來創建您的第一個資料夾
          </p>
          <button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow-sm hover:bg-primary/90 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            新建資料夾
          </button>
        </div>
      )}
    </div>
  );
} 