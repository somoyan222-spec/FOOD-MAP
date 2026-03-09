import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '广州美食地图 | 地铁周边美食指南',
    template: '%s | 广州美食地图',
  },
  description:
    '探索广州地铁沿线美食，记录你喜爱的餐厅和推荐菜品。支持美食评分、分类管理和距离显示，帮你轻松找到地铁站周边的美味。',
  keywords: [
    '广州美食地图',
    '广州地铁美食',
    '广州餐厅推荐',
    '美食指南',
    '美食评分',
  ],
  authors: [{ name: '广州美食地图' }],
  generator: 'Coze Code',
  openGraph: {
    title: '广州美食地图 | 地铁周边美食指南',
    description:
      '探索广州地铁沿线美食，记录你喜爱的餐厅和推荐菜品。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
