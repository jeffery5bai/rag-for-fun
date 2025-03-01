import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export default function FoldersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo and Product Name */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden rounded-md shadow-sm">
              <Image 
                src="/rag-for-fun-logo.png" 
                alt="NotebookAI Logo" 
                width={40} 
                height={40}
                className="transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <h1 className="ml-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              NotebookAI
            </h1>
          </Link>
          
          {/* Right Side - Logout Button */}
          <button className="inline-flex items-center justify-center h-9 px-4 py-2 border border-border bg-background text-foreground text-sm font-medium rounded-md shadow-sm hover:bg-muted/50 transition-colors">
            登出
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
} 