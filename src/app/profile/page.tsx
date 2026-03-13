'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FoodPattern } from '@/components/food-pattern';
import { FoodItem, SubwayLine } from '@/types';
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
import { Trash2, Edit2, MapPin, Calendar, Star, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [userFoods, setUserFoods] = useState<FoodItem[]>([]);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lines, setLines] = useState<SubwayLine[]>([]);

  useEffect(() => {
    const checkFirebase = () => {
      const available = firebaseStorage.isAvailable();
      setIsUsingFirebase(available);
    };

    checkFirebase();
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      if (isUsingFirebase) {
        const firebaseData = await firebaseStorage.getData();
        setLines(firebaseData.lines);
        filterUserFoods(firebaseData.lines);
      } else {
        const localData = storage.getData();
        setLines(localData.lines);
        filterUserFoods(localData.lines);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUserFoods = (lines: SubwayLine[]) => {
    if (!user) return;

    const foods = lines
      .flatMap(line => line.stations)
      .flatMap(station => station.foods || [])
      .filter(food => food.userId === user.id);

    setUserFoods(foods);
  };

  const handleDeleteFood = async (foodId: string) => {
    if (!confirm("确定要删除这个美食吗？")) return;

    if (isUsingFirebase) {
      // 这里需要在firebase-storage.ts中实现删除功能
      // 暂时使用本地存储实现
    } else {
      const data = storage.getData();
      let foodFound = false;

      for (const line of data.lines) {
        for (const station of line.stations) {
          if (station.foods) {
            const initialLength = station.foods.length;
            station.foods = station.foods.filter(f => f.id !== foodId);
            if (station.foods.length !== initialLength) {
              foodFound = true;
              break;
            }
          }
        }
        if (foodFound) break;
      }

      if (foodFound) {
        storage.saveData(data);
        loadUserData();
      }
    }
  };

  // 检查用户是否登录
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>加载中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center relative" style={{ background: '#FFF8E7' }}>
        <FoodPattern />
        <div className="text-center relative z-10">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>请先登录</CardTitle>
              <CardDescription>只有登录用户才能访问个人中心</CardDescription>
            </CardHeader>
            <CardContent>
              <p>您还没有登录，请先登录后再访问个人中心。</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/auth">去登录</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#FFF8E7' }}>
      <FoodPattern />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">个人中心</h1>
              <p className="text-gray-600">查看和管理您的美食卡片</p>
            </div>
            <Button asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </header>

        {/* 用户信息 */}
        <Card className="mb-8 memphis-card" style={{ transform: 'rotate(-1deg)' }}>
          <CardHeader>
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-16 h-16 rounded-full border-2 border-black" 
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-#98D9C2 flex items-center justify-center border-2 border-black">
                  {user.displayName?.[0] || user.email?.[0]}
                </div>
              )}
              <div>
                <CardTitle className="text-2xl">{user.displayName || user.email}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <p className="text-sm mt-1">
                  角色: {user.role === 'developer' ? '开发者' : '普通用户'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="memphis-card p-4" style={{ transform: 'rotate(1deg)' }}>
                <h3 className="font-bold text-xl">{userFoods.length}</h3>
                <p className="text-sm opacity-70">上传的美食</p>
              </div>
              <div className="memphis-card p-4" style={{ transform: 'rotate(-1deg)' }}>
                <h3 className="font-bold text-xl">
                  {userFoods.reduce((sum, food) => sum + (food.likes || 0), 0)}
                </h3>
                <p className="text-sm opacity-70">获得的点赞</p>
              </div>
              <div className="memphis-card p-4" style={{ transform: 'rotate(0.5deg)' }}>
                <h3 className="font-bold text-xl">
                  {userFoods.reduce((sum, food) => sum + (food.comments?.length || 0), 0)}
                </h3>
                <p className="text-sm opacity-70">获得的评论</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 我的美食卡片 */}
        <Card className="memphis-card" style={{ transform: 'rotate(0.5deg)' }}>
          <CardHeader>
            <CardTitle>我的美食卡片</CardTitle>
            <CardDescription>共 {userFoods.length} 个美食卡片</CardDescription>
          </CardHeader>
          <CardContent>
            {userFoods.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">您还没有上传美食卡片</p>
                <Button asChild className="mt-4">
                  <Link href="/">去添加美食</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>美食名称</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>站点</TableHead>
                    <TableHead>评分</TableHead>
                    <TableHead>点赞数</TableHead>
                    <TableHead>评论数</TableHead>
                    <TableHead>添加时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userFoods.map((food) => {
                    // 找到美食所属的站点
                    let stationName = '未知站点';
                    for (const line of lines) {
                      for (const station of line.stations) {
                        if (station.foods?.some(f => f.id === food.id)) {
                          stationName = station.name;
                          break;
                        }
                      }
                    }

                    return (
                      <TableRow key={food.id}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.category}</TableCell>
                        <TableCell>{stationName}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star size={16} fill="#F7DC6F" className="mr-1" />
                            {food.rating}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Heart size={16} fill="#FF6B6B" className="mr-1" />
                            {food.likes || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MessageCircle size={16} className="mr-1" />
                            {food.comments?.length || 0}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(food.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary">
                              <Edit2 size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteFood(food.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
