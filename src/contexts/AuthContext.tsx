'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { getFirebase } from '@/lib/firebase';
import { User, AuthState } from '@/types';

// 认证上下文类型
interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 开发者邮箱列表
  const developerEmails = [
    'somoyan222@gmail.com' // 开发者邮箱
  ];

  // 从本地存储加载用户
  useEffect(() => {
    const loadUser = () => {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }
        const storedUser = localStorage.getItem('localUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('加载用户失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // 注册
  const signUp = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (typeof window === 'undefined') {
        throw new Error('不支持在服务端注册');
      }

      // 检查邮箱是否已存在
      const existingUser = localStorage.getItem('localUser');
      if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.email === email) {
          throw new Error('邮箱已被注册');
        }
      }

      // 创建新用户
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        displayName,
        photoURL: '',
        role: developerEmails.includes(email) ? 'developer' : 'user',
        createdAt: new Date().toISOString(),
      };

      // 存储用户到本地存储
      localStorage.setItem('localUser', JSON.stringify(newUser));
      localStorage.setItem('localAuth', 'true');
      setUser(newUser);
    } catch (error: any) {
      setError(error.message || '注册失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 登录
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (typeof window === 'undefined') {
        throw new Error('不支持在服务端登录');
      }

      // 检查开发者账号密码
      if (developerEmails.includes(email) && password !== '000212yzy') {
        throw new Error('开发者账号密码错误');
      }

      // 模拟登录
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        photoURL: '',
        role: developerEmails.includes(email) ? 'developer' : 'user',
        createdAt: new Date().toISOString(),
      };

      // 存储用户到本地存储
      localStorage.setItem('localUser', JSON.stringify(newUser));
      localStorage.setItem('localAuth', 'true');
      setUser(newUser);
    } catch (error: any) {
      setError(error.message || '登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  // Google登录
  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (typeof window === 'undefined') {
        throw new Error('不支持在服务端登录');
      }

      // 模拟Google登录
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: 'googleuser@gmail.com',
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      // 存储用户到本地存储
      localStorage.setItem('localUser', JSON.stringify(newUser));
      localStorage.setItem('localAuth', 'true');
      setUser(newUser);
    } catch (error: any) {
      setError(error.message || 'Google登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 登出
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      if (typeof window === 'undefined') {
        throw new Error('不支持在服务端登出');
      }

      // 从本地存储移除用户
      localStorage.removeItem('localUser');
      localStorage.removeItem('localAuth');
      setUser(null);
    } catch (error: any) {
      setError(error.message || '登出失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 更新用户资料
  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (!user) {
      setError('用户未登录');
      return;
    }

    setIsLoading(true);
    try {
      if (typeof window === 'undefined') {
        throw new Error('不支持在服务端更新资料');
      }

      const updatedUser: User = {
        ...user,
        displayName,
        photoURL,
      };

      // 更新本地存储
      localStorage.setItem('localUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      setError(error.message || '更新资料失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 构建认证上下文值
  const value: AuthContextType = {
    user,
    isLoading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut: handleSignOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 使用认证上下文的Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
