import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white">
      {/* Header/Logo Section */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden rounded-lg shadow-sm">
              <Image 
                src="/rag-for-fun-logo.png" 
                alt="NotebookAI Logo" 
                width={48} 
                height={48}
                className="transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <h1 className="ml-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              NotebookAI
            </h1>
          </Link>
          
          <Link 
            href="/auth" 
            className="inline-flex items-center justify-center h-9 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow-sm hover:opacity-90 transition-colors"
          >
            加入等待名單
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex flex-col space-y-6 md:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              將你的文檔<span className="text-primary">轉變為知識</span>
            </h2>
            <p className="text-xl text-secondary-foreground max-w-xl">
              NotebookAI 是你的智能研究助手，可以從你的文檔中總結要點、回答問題，並生成新的見解。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/auth?tab=login" 
                className="inline-flex items-center justify-center h-10 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md shadow-sm hover:opacity-90 transition-colors text-center"
              >
                立即登入 (Alpha 測試版)
              </Link>
              <Link 
                href="/auth" 
                className="inline-flex items-center justify-center h-10 px-6 py-2 border border-input bg-background text-foreground font-medium rounded-md shadow-sm hover:bg-secondary/10 transition-colors text-center"
              >
                加入等待名單
              </Link>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="md:w-1/2">
            <Image 
              src="/notebook-hero.png" 
              alt="NotebookAI interface demonstration" 
              width={650} 
              height={500} 
              className="rounded-lg shadow-md"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          從文檔到智能洞察，只需幾秒鐘
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">智能總結</h3>
            <p className="text-muted-foreground">自動從你的文檔中提取關鍵信息，生成清晰的概述和重點。</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">提問交流</h3>
            <p className="text-muted-foreground">向你的文檔提問，獲取準確的回答，包含來源引用，確保信息可靠。</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">創意激發</h3>
            <p className="text-muted-foreground">發現文檔之間的新聯繫，生成創意內容，幫助你拓展思維邊界。</p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto bg-secondary/10 p-8 md:p-12 rounded-2xl shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            準備好提升你的知識管理方式了嗎？
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            加入 NotebookAI，體驗 AI 驅動的文檔管理的未來。
          </p>
          <Link 
            href="/auth" 
            className="inline-flex items-center justify-center h-10 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md shadow-sm hover:opacity-90 transition-colors"
          >
            加入等待名單
          </Link>
        </div>
      </div>
    </div>
  );
}
