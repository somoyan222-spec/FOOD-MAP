'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { FoodPattern } from '@/components/food-pattern';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { signUp, signIn, signInWithGoogle, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, displayName);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center relative" style={{ background: '#FFF8E7' }}>
      <FoodPattern />
      <Card className="w-full max-w-md p-6 shadow-lg relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? '登录' : '注册'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin ? '登录你的账号' : '创建新账号'}
          </CardDescription>
        </CardHeader>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName">用户名</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="请输入用户名"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '处理中...' : isLogin ? '登录' : '注册'}
            </Button>
            
            <div className="flex items-center justify-center">
              <div className="h-px bg-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500">或</span>
              <div className="h-px bg-gray-300 flex-grow"></div>
            </div>
            
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2"
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              <Mail size={18} />
              用Google登录
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              {isLogin ? '还没有账号？' : '已有账号？'}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline ml-1"
              >
                {isLogin ? '立即注册' : '立即登录'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
