import { NextResponse } from 'next/server';
import { emailRule } from '@/utils/regexRules';
import axiosClient from '@/lib/axiosClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // 基本驗證
    if (!email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 使用 regex 驗證 email 格式
    let emailError: string | undefined;
    emailRule().validator(null, email, (error?: string) => {
      emailError = error;
    });
    
    if (emailError) {
      return NextResponse.json(
        { code: 1, msg: emailError },
        { status: 400 }
      );
    }

    // 準備發送給實際後端 API 的數據
    const userData = {
      email
    };
    
    // 使用 axiosClient 呼叫實際後端 API
    try {
      const response = await axiosClient.post('/auth/send_email', userData);
      console.log('API response:', response);
      
      return NextResponse.json(
        { code: 0, message: 'Email verification successful', data: response },
        { status: 200 }
      );
    } catch (error) {
      console.error('API call error:', error);
      return NextResponse.json(
        { code: 1, error: 'Failed to verify email with backend' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { code: 500, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
    
