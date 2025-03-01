import type { Folder } from "@/types/folders.interface";

export const mockFolders: Folder[] = [
  {
    id: "f1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    name: "研究筆記",
    description: "收集整理學術研究相關的筆記、論文摘要和實驗數據",
    createdAt: "2023-12-01T08:00:00Z",
    updatedAt: "2024-05-05T14:30:00Z",
    documentsCount: 12,
    coverColor: "bg-primary-300"
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    name: "項目計劃",
    description: "儲存各種項目的計劃書、進度報告和會議紀要",
    createdAt: "2023-11-15T10:20:00Z",
    updatedAt: "2024-05-02T09:15:00Z",
    documentsCount: 8,
    coverColor: "bg-info-300"
  },
  {
    id: "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6",
    name: "創意收集",
    description: "記錄靈感、創意和點子，方便日後回顧和發展",
    createdAt: "2024-01-20T15:45:00Z",
    updatedAt: "2024-04-28T16:40:00Z",
    documentsCount: 15,
    coverColor: "bg-success-300"
  },
  {
    id: "q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6",
    name: "學習資料",
    description: "各類課程筆記、教程和學習資源的彙總",
    createdAt: "2024-02-05T09:30:00Z",
    updatedAt: "2024-05-01T11:20:00Z",
    documentsCount: 23,
    coverColor: "bg-warning-300"
  },
  {
    id: "z1x2c3v4-b5n6-m7a8-s9d0-f1g2h3j4k5l6",
    name: "工作文檔",
    description: "工作相關的各種文檔、報告和規劃",
    createdAt: "2024-03-10T13:15:00Z",
    updatedAt: "2024-04-30T17:00:00Z",
    documentsCount: 18,
    coverColor: "bg-accent-300"
  }
]; 