'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FoodPattern } from '@/components/food-pattern';
import { AppData, FoodItem, User } from '@/types';
import { storage } from '@/lib/data';
import { firebaseStorage } from '@/lib/firebase-storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { TableBody } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table';
import { TableHead } from '@/components/ui/table';
import { TableHeader } from '@/components/ui/table';
import { TableRow } from '@/components/ui/table';
import { Trash2, Edit2, Users, Utensils, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const [data, setData] = useState<AppData | null>(null);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirebase = () => {
      const available = firebaseStorage.isAvailable();
      setIsUsingFirebase(available);
    };

    checkFirebase();
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      if (isUsingFirebase) {
        const firebaseData = await firebaseStorage.getData();
        setData(firebaseData);
      } else {
        const localData = storage.getData();
        setData(localData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 检查用户是否是开发者
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>加载中...</p>
      </div>
    );
  }

  if (!user || user.role !== 'developer') {
    return (
      <div className="flex h-screen items-center justify-center relative" style={{ background: '#FFF8E7' }}>
        <FoodPattern />
        <div className="text-center relative z-10">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>访问被拒绝</CardTitle>
              <CardDescription>只有开发者可以访问此页面</CardDescription>
            </CardHeader>
            <CardContent>
              <p>您没有权限访问此页面，请返回首页。</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/">返回首页</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // 获取所有美食卡片
  const allFoods = data?.lines
    .flatMap(line => line.stations)
    .flatMap(station => station.foods || []) || [];

  // 获取所有用户（从美食卡片中提取）
  const allUsers = Array.from(
    new Map(
      allFoods.map(food => [food.userId, {
        id: food.userId,
        name: food.userName,
        email: food.userId.includes('guest_') ? 'guest@example.com' : `${food.userId}@example.com`
      }])
    ).values()
  );

  return (
    <div className="min-h-screen relative" style={{ background: '#FFF8E7' }}>
      <FoodPattern />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">开发者管理后台</h1>
              <p className="text-gray-600">管理所有美食卡片和用户</p>
            </div>
            <Button asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 统计信息 */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="memphis-card" style={{ transform: 'rotate(-1deg)' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{allFoods.length}</CardTitle>
                <CardDescription>美食卡片总数</CardDescription>
              </CardHeader>
              <CardContent>
                <Utensils size={32} className="text-#FF6B6B" />
              </CardContent>
            </Card>
            
            <Card className="memphis-card" style={{ transform: 'rotate(1deg)' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{allUsers.length}</CardTitle>
                <CardDescription>用户总数</CardDescription>
              </CardHeader>
              <CardContent>
                <Users size={32} className="text-#98D9C2" />
              </CardContent>
            </Card>
          </div>

          {/* 最近添加的美食 */}
          <Card className="memphis-card" style={{ transform: 'rotate(0.5deg)' }}>
            <CardHeader>
              <CardTitle>最近添加的美食</CardTitle>
              <CardDescription>按添加时间排序</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>美食名称</TableHead>
                    <TableHead>添加者</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allFoods
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map((food) => (
                      <TableRow key={food.id}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.userName}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary">
                              <Edit2 size={16} />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* 所有美食卡片 */}
        <Card className="mt-8 memphis-card" style={{ transform: 'rotate(-0.5deg)' }}>
          <CardHeader>
            <CardTitle>所有美食卡片</CardTitle>
            <CardDescription>共 {allFoods.length} 个美食卡片</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>美食名称</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>添加者</TableHead>
                  <TableHead>点赞数</TableHead>
                  <TableHead>评论数</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allFoods.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.category}</TableCell>
                    <TableCell>{food.userName}</TableCell>
                    <TableCell>{food.likes || 0}</TableCell>
                    <TableCell>{food.comments?.length || 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Edit2 size={16} />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 系统信息 */}
        <Card className="mt-8 memphis-card" style={{ transform: 'rotate(0.5deg)' }}>
          <CardHeader>
            <CardTitle>系统信息</CardTitle>
            <CardDescription>当前系统状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">数据存储</h3>
                <p>使用: {isUsingFirebase ? 'Firebase' : '本地存储'}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">开发者</h3>
                <p>当前登录: {user.displayName || user.email}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">数据统计</h3>
                <p>线路数: {data?.lines.length || 0}</p>
                <p>站点数: {data?.lines.flatMap(line => line.stations).length || 0}</p>
                <p>美食数: {allFoods.length}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">操作</h3>
                <Button onClick={loadData} className="mt-2">
                  <Zap size={16} className="mr-2" />
                  刷新数据
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
