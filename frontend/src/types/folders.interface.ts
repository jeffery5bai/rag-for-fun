export interface Folder {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  documentsCount: number;
  coverColor?: string; // 封面颜色，可以用来生成文件夹图标的背景色
} 