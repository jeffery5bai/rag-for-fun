import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import axiosClient from '@/lib/axiosClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, pwd, otpCode } = body;

    // 基本驗證
    if (!name || !email || !pwd) {
      return NextResponse.json(
        { code: 1, msg: '缺少必填欄位' },
        { status: 400 }
      );
    }

    // 密碼加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);

    // 準備發送給實際後端 API 的數據
    const userData = {
      name,
      email,
      pwd: hashedPassword,
      verification_code: otpCode
    };

    // 使用 axiosClient 呼叫實際後端 API
    try {
      const response: { code: number, msg: string } = await axiosClient.post('/auth/register', userData);
      console.log(response);

      // 檢查後端返回的 code
      if (response && response.code !== undefined && response.code !== 0) {
        // 如果後端返回錯誤碼，則返回對應的錯誤信息
        return NextResponse.json(
          { code: response.code, msg: response.msg || '註冊失敗' },
          { status: 400 }
        );
      }

      // 成功註冊
      return NextResponse.json(
        { code: 0, message: 'Registration successful' },
        { status: 200 }
      );
    } catch (apiError: unknown) {
      // 處理 API 調用錯誤
      console.error('API call error:', apiError);
      const errorResponse = (apiError as { response?: { data: { code: number, msg: string } } }).response?.data;
      
      return NextResponse.json(
        { 
          code: errorResponse?.code || 500, 
          msg: errorResponse?.msg || '與後端通信時發生錯誤' 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { code: 500, msg: '内部服务器错误' },
      { status: 500 }
    );
  }
} 