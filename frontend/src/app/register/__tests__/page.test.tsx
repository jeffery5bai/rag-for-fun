import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../page';

describe('Register Page', () => {
  // 測試頁面渲染
  it('renders all form elements correctly', () => {
    render(<Register />);
    
    // 檢查標題
    expect(screen.getByText('Sign Up to Join Waitlist')).toBeInTheDocument();
    
    // 檢查所有輸入欄位
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    
    // 檢查提交按鈕
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    
    // 檢查返回首頁連結
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  // 測試表單驗證 - 空欄位
  it('disables submit button when any field is empty', () => {
    render(<Register />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // 初始狀態應該是禁用的
    expect(submitButton).toBeDisabled();

    // 填寫部分欄位
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    // 確認密碼欄位為空，按鈕應該仍然禁用
    expect(submitButton).toBeDisabled();
  });

  // 測試密碼不匹配的情況
  it('disables submit button when passwords do not match', () => {
    render(<Register />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // 填寫所有欄位，但密碼不匹配
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password456' } });

    // 按鈕應該是禁用的
    expect(submitButton).toBeDisabled();

    // 檢查錯誤訊息是否顯示
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  // 測試所有欄位填寫正確的情況
  it('enables submit button when all fields are filled and passwords match', () => {
    render(<Register />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // 填寫所有欄位，且密碼匹配
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    // 按鈕應該是啟用的
    expect(submitButton).not.toBeDisabled();
  });
}); 