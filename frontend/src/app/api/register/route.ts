import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, pwd } = body;

    // 基本驗證
    if (!name || !email || !pwd) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
      pwd: hashedPassword
    };

    // TODO: 這裡應該呼叫你的實際後端 API
    // const response = await fetch('YOUR_BACKEND_API', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    console.log(userData);

    // 目前先回傳成功訊息
    return NextResponse.json(
      { code: 0, message: 'Registration successful' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { code: 500, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 