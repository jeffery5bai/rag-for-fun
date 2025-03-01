import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 使用 CSS 變數系統，以支持日夜主題切換
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        
        // 主色系統
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          // 保留漸變色系結構以便於樣式擴展
          50: "#EFF6FF",   
          100: "#DBEAFE",  
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",  
          700: "#1D4ED8",  
          800: "#1E40AF", 
          900: "#1E3A8A",
          950: "#172554",
        },
        
        // 次要色系統
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          // 保留漸變色系結構
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B", 
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        
        // 強調色系統
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          // 保留漸變色系結構
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
        },
        
        // UI 狀態色
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        
        // 功能色系統
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
          // 保留漸變色系結構
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        },
        
        error: {
          DEFAULT: "var(--error)",
          foreground: "var(--error-foreground)",
          // 保留漸變色系結構
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },
        
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
          // 保留漸變色系結構
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },
        
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
          // 保留漸變色系結構
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        
        // UI 元素顏色
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        
        // 圖表顏色
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      
      // 圓角設定
      borderRadius: {
        'none': '0',
        'sm': 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      
      // 陰影設定
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
      
      // 字體大小與行高
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      
      // 間距/空白
      spacing: {
        px: "1px",
        0: "0",
        0.5: "0.125rem", // 2px
        1: "0.25rem",    // 4px
        1.5: "0.375rem", // 6px
        2: "0.5rem",     // 8px
        2.5: "0.625rem", // 10px
        3: "0.75rem",    // 12px
        3.5: "0.875rem", // 14px
        4: "1rem",       // 16px
        5: "1.25rem",    // 20px
        6: "1.5rem",     // 24px
        7: "1.75rem",    // 28px
        8: "2rem",       // 32px
        9: "2.25rem",    // 36px
        10: "2.5rem",    // 40px
        11: "2.75rem",   // 44px
        12: "3rem",      // 48px
        14: "3.5rem",    // 56px
        16: "4rem",      // 64px
        20: "5rem",      // 80px
        24: "6rem",      // 96px
        28: "7rem",      // 112px
        32: "8rem",      // 128px
        36: "9rem",      // 144px
        40: "10rem",     // 160px
        44: "11rem",     // 176px
        48: "12rem",     // 192px
        52: "13rem",     // 208px
        56: "14rem",     // 224px
        60: "15rem",     // 240px
        64: "16rem",     // 256px
        72: "18rem",     // 288px
        80: "20rem",     // 320px
        96: "24rem",     // 384px
      },
      
      // 過渡時間
      transitionDuration: {
        DEFAULT: "150ms",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
      },
      
      // 過渡時間函數
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      
      // Z-index 層級
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        75: "75",
        100: "100",
        tooltip: "1000",
        modal: "1100",
        popover: "1200",
        auto: "auto",
      },
    },
  },
  plugins: [],
} satisfies Config;
