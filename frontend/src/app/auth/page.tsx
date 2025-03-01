'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { emailRule } from "@/utils/regexRules";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSeparator, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { toast } from "sonner";

// 註冊表單驗證模式
const registerSchema = z.object({
  name: z.string().min(2, {
    message: "姓名必須至少有 2 個字元",
  }).nonempty("姓名為必填欄位"),
  email: z.string().nonempty("電子郵件為必填欄位").refine(
    (email) => {
      // 模擬 emailRule 的驗證邏輯
      const validator = emailRule(true).validator;
      let isValid = true;
      
      validator(null, email, (error) => {
        if (error) isValid = false;
      });
      
      return isValid;
    },
    {
      message: "請輸入有效的電子郵件地址",
    }
  ),
  password: z.string().min(8, {
    message: "密碼必須至少有 8 個字元",
  }).nonempty("密碼為必填欄位"),
  confirmPassword: z.string().nonempty("請確認密碼")
}).refine((data) => data.password === data.confirmPassword, {
  message: "密碼不符合",
  path: ["confirmPassword"],
});

// 登入表單驗證模式
const loginSchema = z.object({
  email: z.string().refine(
    (email) => {
      // 模擬 emailRule 的驗證邏輯
      const validator = emailRule(true).validator;
      let isValid = true;
      
      validator(null, email, (error) => {
        if (error) isValid = false;
      });
      
      return isValid;
    },
    {
      message: "請輸入有效的電子郵件地址",
    }
  ),
  password: z.string().min(1, {
    message: "請輸入密碼",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Auth() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(tabParam === "login" ? "login" : "register");
  const [showOTP, setShowOTP] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [registrationData, setRegistrationData] = useState<RegisterFormValues | null>(null);

  // 註冊表單
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // 登入表單
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // 處理驗證電子郵件
  const handleVerifyEmail = async (email: string) => {
    try {
      const response = await fetch('/api/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.code !== 0) {
        toast.error("錯誤", {
          description: data.msg || '電子郵件驗證失敗',
        });
        throw new Error(data.msg || '電子郵件驗證失敗');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生錯誤');
      return false;
    }
  };

  // 處理註冊表單提交
  const handleRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      // 保存註冊數據以便後續使用
      setRegistrationData(data);
      
      // 驗證電子郵件
      const emailVerified = await handleVerifyEmail(data.email);
      
      if (emailVerified) {
        // 成功驗證電子郵件後，切換到 OTP 輸入畫面
        setShowOTP(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  // 處理完整註冊流程（含 OTP）
  const handleCompleteRegistration = async () => {
    if (!registrationData || otpValue.length !== 6) {
      setError('驗證碼不完整或註冊數據丟失');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const requestBody = {
        name: registrationData.name,
        email: registrationData.email,
        pwd: registrationData.password,
        otpCode: otpValue
      };
      
      console.log('提交資料到 /api/register:', requestBody);
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('註冊 API 回應:', responseData);

      // 檢查回應中的 code 欄位
      if (responseData.code !== 0) {
        // 當 code 不為 0 時，顯示錯誤通知
        toast.error("錯誤", {
          description: responseData.msg || '註冊失敗',
        });
        throw new Error(responseData.msg || '註冊失敗');
      }

      // 註冊成功
      console.log('註冊成功:', responseData);
      
      // 顯示成功 toast 通知
      toast.success("註冊成功！", {
        description: "請馬上登入使用此服務",
      });
      
      // 重置狀態，返回登入頁面
      setShowOTP(false);
      setActiveTab("login");
      setOtpValue('');
      setRegistrationData(null);
      
    } catch (err) {
      console.error('註冊失敗:', err);
      setError(err instanceof Error ? err.message : '發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  // 處理登入表單提交
  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      const requestBody = {
        email: data.email,
        pwd: data.password,
      };
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || '登入失敗');
      }

      // 登入成功
      console.log('登入成功:', responseData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError('');
    // 切換標籤頁時重置表單錯誤
    if (value === "register") {
      registerForm.clearErrors();
    } else {
      loginForm.clearErrors();
    }
  };

  // 當 OTP 值變更時（只更新值，不自動提交）
  const handleOTPChange = (value: string) => {
    setOtpValue(value);
    // 移除自動提交邏輯
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-orange-500 via-black to-black from-0% via-50% to-100%">
      <div className="w-full max-w-md bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-xl border border-orange-500/20">
        {showOTP ? (
          // OTP 驗證畫面
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-2 text-white">驗證您的電子郵件</h1>
            <p className="text-white/80 text-center mb-6">
              我們已發送一個 6 位數驗證碼至 {registrationData?.email}
            </p>
            
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}
            
            <div className="flex flex-col items-center space-y-4">
              <InputOTP 
                maxLength={6} 
                value={otpValue} 
                onChange={handleOTPChange}
                containerClassName="justify-center text-white"
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              {isLoading && (
                <div className="text-white text-center">處理中...</div>
              )}
              
              <div className="text-sm text-white/70 text-center">
                沒有收到驗證碼？ 
                <button 
                  onClick={() => handleVerifyEmail(registrationData?.email || '')} 
                  className="text-orange-300 hover:text-orange-400 ml-1"
                  disabled={isLoading}
                >
                  重新發送
                </button>
              </div>
            </div>
            <Button
              onClick={handleCompleteRegistration}
              disabled={otpValue.length !== 6 || isLoading}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400"
            >
              {isLoading ? '處理中...' : '確認驗證碼'}
            </Button>
          </div>
        ) : (
          // 註冊/登入畫面
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-white">歡迎</h1>
            
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}

            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="w-full mb-6">
                <TabsTrigger value="register" className="flex-1">註冊</TabsTrigger>
                <TabsTrigger value="login" className="flex-1">登入</TabsTrigger>
              </TabsList>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-5" noValidate>
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">姓名</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full text-black bg-white/90"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">電子郵件</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full text-black bg-white/90"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">密碼</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              className="w-full text-black bg-white/90"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">確認密碼</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              className="w-full text-black bg-white/90"
                              onBlur={() => {
                                // 當用戶離開此欄位時觸發確認密碼的驗證
                                if (field.value && field.value !== registerForm.getValues('password')) {
                                  registerForm.setError('confirmPassword', {
                                    type: 'manual',
                                    message: '密碼不符合'
                                  });
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={
                        isLoading || 
                        (!registerForm.formState.isValid || Object.keys(registerForm.formState.errors).length > 0)
                      }
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400"
                    >
                      {isLoading ? '提交中...' : '註冊'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5" noValidate>
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">電子郵件</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full text-black bg-white/90"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">密碼</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              className="w-full text-black bg-white/90"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading || !loginForm.formState.isValid || Object.keys(loginForm.formState.errors).length > 0}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-400"
                    >
                      {isLoading ? '登入中...' : '登入'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-orange-300 hover:text-orange-400">
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
} 