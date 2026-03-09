import { AppData, FoodCategory, PriceRange } from "@/types";

// 数据版本号 - 每次更新地铁数据时需要增加此版本号
export const DATA_VERSION = "v2.5.0";

// 广州地铁线路数据（完整版，规则布局）
export const initialData: AppData = {
  version: DATA_VERSION,
  lines: [
    // 1号线 - 东西向横贯中心城区
    {
      id: "line-1",
      name: "1号线",
      color: "#F7B500",
      stations: [
        { id: "s1-1", name: "西朗", lineId: "line-1", x: 150, y: 600, foods: [] },
        { id: "s1-2", name: "坑口", lineId: "line-1", x: 250, y: 600, foods: [] },
        { id: "s1-3", name: "花地湾", lineId: "line-1", x: 350, y: 600, foods: [] },
        { id: "s1-4", name: "芳村", lineId: "line-1", x: 450, y: 600, foods: [] },
        { id: "s1-5", name: "黄沙", lineId: "line-1", x: 550, y: 600, foods: [] },
        { id: "s1-6", name: "长寿路", lineId: "line-1", x: 650, y: 600, foods: [] },
        { id: "s1-7", name: "陈家祠", lineId: "line-1", x: 750, y: 600, foods: [] },
        { id: "s1-8", name: "西门口", lineId: "line-1", x: 850, y: 600, foods: [] },
        { id: "s1-9", name: "公园前", lineId: "line-1", x: 950, y: 600, foods: [] },
        { id: "s1-10", name: "农讲所", lineId: "line-1", x: 1050, y: 600, foods: [] },
        { id: "s1-11", name: "烈士陵园", lineId: "line-1", x: 1150, y: 600, foods: [] },
        { id: "s1-12", name: "东山口", lineId: "line-1", x: 1250, y: 600, foods: [] },
        { id: "s1-13", name: "杨箕", lineId: "line-1", x: 1350, y: 600, foods: [] },
        { id: "s1-14", name: "体育西路", lineId: "line-1", x: 1450, y: 600, foods: [] },
        { id: "s1-15", name: "体育中心", lineId: "line-1", x: 1550, y: 600, foods: [] },
        { id: "s1-16", name: "广州东站", lineId: "line-1", x: 1650, y: 600, foods: [] },
      ],
    },
    // 2号线 - 改为横向展示，增加站点间距避免名称重叠
    {
      id: "line-2",
      name: "2号线",
      color: "#005BB9",
      stations: [
        { id: "s2-1", name: "嘉禾望岗", lineId: "line-2", x: 100, y: 900, foods: [] },
        { id: "s2-2", name: "黄边", lineId: "line-2", x: 180, y: 900, foods: [] },
        { id: "s2-3", name: "江夏", lineId: "line-2", x: 250, y: 900, foods: [] },
        { id: "s2-4", name: "白云大道北", lineId: "line-2", x: 340, y: 900, foods: [] },
        { id: "s2-5", name: "白云公园", lineId: "line-2", x: 430, y: 900, foods: [] },
        { id: "s2-6", name: "飞翔公园", lineId: "line-2", x: 520, y: 900, foods: [] },
        { id: "s2-7", name: "三元里", lineId: "line-2", x: 610, y: 900, foods: [] },
        { id: "s2-8", name: "广州火车站", lineId: "line-2", x: 720, y: 900, foods: [] },
        { id: "s2-9", name: "越秀公园", lineId: "line-2", x: 820, y: 900, foods: [] },
        { id: "s2-10", name: "纪念堂", lineId: "line-2", x: 900, y: 900, foods: [] },
        { id: "s2-11", name: "公园前", lineId: "line-2", x: 980, y: 900, foods: [] },
        { id: "s2-12", name: "海珠广场", lineId: "line-2", x: 1080, y: 900, foods: [] },
        { id: "s2-13", name: "市二宫", lineId: "line-2", x: 1160, y: 900, foods: [] },
        { id: "s2-14", name: "江南西", lineId: "line-2", x: 1240, y: 900, foods: [] },
        { id: "s2-15", name: "昌岗", lineId: "line-2", x: 1320, y: 900, foods: [] },
        { id: "s2-16", name: "客村", lineId: "line-2", x: 1390, y: 900, foods: [] },
        { id: "s2-17", name: "赤岗", lineId: "line-2", x: 1460, y: 900, foods: [] },
        { id: "s2-18", name: "磨碟沙", lineId: "line-2", x: 1540, y: 900, foods: [] },
        { id: "s2-19", name: "新港东", lineId: "line-2", x: 1620, y: 900, foods: [] },
        { id: "s2-20", name: "琶洲", lineId: "line-2", x: 1700, y: 900, foods: [] },
        { id: "s2-21", name: "广州南站", lineId: "line-2", x: 1800, y: 900, foods: [] },
      ],
    },
    // 3号线 - 改为横向展示，增加站点间距
    {
      id: "line-3",
      name: "3号线",
      color: "#FF9A1C",
      stations: [
        { id: "s3-1", name: "天河客运站", lineId: "line-3", x: 450, y: 750, foods: [] },
        { id: "s3-2", name: "五山", lineId: "line-3", x: 570, y: 750, foods: [] },
        { id: "s3-3", name: "华师", lineId: "line-3", x: 660, y: 750, foods: [] },
        { id: "s3-4", name: "岗顶", lineId: "line-3", x: 750, y: 750, foods: [] },
        { id: "s3-5", name: "石牌桥", lineId: "line-3", x: 850, y: 750, foods: [] },
        { id: "s3-6", name: "体育西路", lineId: "line-3", x: 980, y: 750, foods: [] },
        { id: "s3-7", name: "珠江新城", lineId: "line-3", x: 1100, y: 750, foods: [] },
        { id: "s3-8", name: "广州塔", lineId: "line-3", x: 1210, y: 750, foods: [] },
        { id: "s3-9", name: "客村", lineId: "line-3", x: 1310, y: 750, foods: [] },
        { id: "s3-10", name: "大塘", lineId: "line-3", x: 1410, y: 750, foods: [] },
        { id: "s3-11", name: "沥滘", lineId: "line-3", x: 1510, y: 750, foods: [] },
        { id: "s3-12", name: "大石", lineId: "line-3", x: 1610, y: 750, foods: [] },
        { id: "s3-13", name: "汉溪长隆", lineId: "line-3", x: 1730, y: 750, foods: [] },
        { id: "s3-14", name: "市桥", lineId: "line-3", x: 1830, y: 750, foods: [] },
        { id: "s3-15", name: "番禺广场", lineId: "line-3", x: 1950, y: 750, foods: [] },
      ],
    },
    // 4号线 - 改为横向展示
    {
      id: "line-4",
      name: "4号线",
      color: "#009A54",
      stations: [
        { id: "s4-1", name: "黄村", lineId: "line-4", x: 450, y: 100, foods: [] },
        { id: "s4-2", name: "车陂", lineId: "line-4", x: 500, y: 100, foods: [] },
        { id: "s4-3", name: "车陂南", lineId: "line-4", x: 550, y: 100, foods: [] },
        { id: "s4-4", name: "万胜围", lineId: "line-4", x: 650, y: 100, foods: [] },
        { id: "s4-5", name: "官洲", lineId: "line-4", x: 750, y: 100, foods: [] },
        { id: "s4-6", name: "大学城北", lineId: "line-4", x: 850, y: 100, foods: [] },
        { id: "s4-7", name: "大学城南", lineId: "line-4", x: 950, y: 100, foods: [] },
        { id: "s4-8", name: "新造", lineId: "line-4", x: 1050, y: 100, foods: [] },
        { id: "s4-9", name: "石碁", lineId: "line-4", x: 1150, y: 100, foods: [] },
        { id: "s4-10", name: "海傍", lineId: "line-4", x: 1250, y: 100, foods: [] },
        { id: "s4-11", name: "低涌", lineId: "line-4", x: 1350, y: 100, foods: [] },
        { id: "s4-12", name: "东涌", lineId: "line-4", x: 1450, y: 100, foods: [] },
        { id: "s4-13", name: "庆盛", lineId: "line-4", x: 1550, y: 100, foods: [] },
        { id: "s4-14", name: "黄阁汽车城", lineId: "line-4", x: 1650, y: 100, foods: [] },
        { id: "s4-15", name: "黄阁", lineId: "line-4", x: 1750, y: 100, foods: [] },
        { id: "s4-16", name: "金洲", lineId: "line-4", x: 1850, y: 100, foods: [] },
      ],
    },
    // 5号线 - 东西向南部
    {
      id: "line-5",
      name: "5号线",
      color: "#C81E25",
      stations: [
        { id: "s5-1", name: "滘口", lineId: "line-5", x: 100, y: 800, foods: [] },
        { id: "s5-2", name: "坦尾", lineId: "line-5", x: 200, y: 800, foods: [] },
        { id: "s5-3", name: "中山八", lineId: "line-5", x: 300, y: 800, foods: [] },
        { id: "s5-4", name: "西场", lineId: "line-5", x: 400, y: 800, foods: [] },
        { id: "s5-5", name: "西村", lineId: "line-5", x: 500, y: 800, foods: [] },
        { id: "s5-6", name: "广州火车站", lineId: "line-5", x: 650, y: 800, foods: [] },
        { id: "s5-7", name: "小北", lineId: "line-5", x: 800, y: 800, foods: [] },
        { id: "s5-8", name: "淘金", lineId: "line-5", x: 950, y: 800, foods: [] },
        { id: "s5-9", name: "区庄", lineId: "line-5", x: 1100, y: 800, foods: [] },
        { id: "s5-10", name: "动物园", lineId: "line-5", x: 1250, y: 800, foods: [] },
        { id: "s5-11", name: "杨箕", lineId: "line-5", x: 1350, y: 800, foods: [] },
        { id: "s5-12", name: "五羊邨", lineId: "line-5", x: 1450, y: 800, foods: [] },
        { id: "s5-13", name: "珠江新城", lineId: "line-5", x: 1550, y: 800, foods: [] },
        { id: "s5-14", name: "猎德", lineId: "line-5", x: 1650, y: 800, foods: [] },
        { id: "s5-15", name: "潭村", lineId: "line-5", x: 1750, y: 800, foods: [] },
        { id: "s5-16", name: "员村", lineId: "line-5", x: 1850, y: 800, foods: [] },
        { id: "s5-17", name: "车陂南", lineId: "line-5", x: 1950, y: 800, foods: [] },
        { id: "s5-18", name: "东圃", lineId: "line-5", x: 2050, y: 800, foods: [] },
        { id: "s5-19", name: "三溪", lineId: "line-5", x: 2150, y: 800, foods: [] },
        { id: "s5-20", name: "鱼珠", lineId: "line-5", x: 2250, y: 800, foods: [] },
        { id: "s5-21", name: "大沙东", lineId: "line-5", x: 2350, y: 800, foods: [] },
        { id: "s5-22", name: "文冲", lineId: "line-5", x: 2450, y: 800, foods: [] },
      ],
    },
    // 6号线 - 东西向西部
    {
      id: "line-6",
      name: "6号线",
      color: "#795628",
      stations: [
        { id: "s6-1", name: "浔峰岗", lineId: "line-6", x: 50, y: 450, foods: [] },
        { id: "s6-2", name: "横沙", lineId: "line-6", x: 150, y: 450, foods: [] },
        { id: "s6-3", name: "沙贝", lineId: "line-6", x: 250, y: 450, foods: [] },
        { id: "s6-4", name: "河沙", lineId: "line-6", x: 350, y: 450, foods: [] },
        { id: "s6-5", name: "坦尾", lineId: "line-6", x: 450, y: 450, foods: [] },
        { id: "s6-6", name: "如意坊", lineId: "line-6", x: 550, y: 450, foods: [] },
        { id: "s6-7", name: "黄沙", lineId: "line-6", x: 650, y: 450, foods: [] },
        { id: "s6-8", name: "文化公园", lineId: "line-6", x: 750, y: 450, foods: [] },
        { id: "s6-9", name: "一德路", lineId: "line-6", x: 850, y: 450, foods: [] },
        { id: "s6-10", name: "海珠广场", lineId: "line-6", x: 950, y: 450, foods: [] },
        { id: "s6-11", name: "北京路", lineId: "line-6", x: 1050, y: 450, foods: [] },
        { id: "s6-12", name: "东湖", lineId: "line-6", x: 1150, y: 450, foods: [] },
        { id: "s6-13", name: "东山口", lineId: "line-6", x: 1250, y: 450, foods: [] },
        { id: "s6-14", name: "区庄", lineId: "line-6", x: 1350, y: 450, foods: [] },
        { id: "s6-15", name: "黄花岗", lineId: "line-6", x: 1450, y: 450, foods: [] },
        { id: "s6-16", name: "沙河顶", lineId: "line-6", x: 1550, y: 450, foods: [] },
        { id: "s6-17", name: "沙河", lineId: "line-6", x: 1650, y: 450, foods: [] },
        { id: "s6-18", name: "天平架", lineId: "line-6", x: 1750, y: 450, foods: [] },
        { id: "s6-19", name: "燕塘", lineId: "line-6", x: 1850, y: 450, foods: [] },
        { id: "s6-20", name: "天河客运站", lineId: "line-6", x: 1950, y: 450, foods: [] },
      ],
    },
    // 7号线 - 改为横向展示
    {
      id: "line-7",
      name: "7号线",
      color: "#9E8E5B",
      stations: [
        { id: "s7-1", name: "广州南站", lineId: "line-7", x: 350, y: 300, foods: [] },
        { id: "s7-2", name: "石壁", lineId: "line-7", x: 450, y: 300, foods: [] },
        { id: "s7-3", name: "谢村", lineId: "line-7", x: 550, y: 300, foods: [] },
        { id: "s7-4", name: "钟村", lineId: "line-7", x: 650, y: 300, foods: [] },
        { id: "s7-5", name: "汉溪长隆", lineId: "line-7", x: 750, y: 300, foods: [] },
        { id: "s7-6", name: "南村万博", lineId: "line-7", x: 850, y: 300, foods: [] },
        { id: "s7-7", name: "员岗", lineId: "line-7", x: 950, y: 300, foods: [] },
        { id: "s7-8", name: "板桥", lineId: "line-7", x: 1050, y: 300, foods: [] },
        { id: "s7-9", name: "大学城南", lineId: "line-7", x: 1150, y: 300, foods: [] },
      ],
    },
    // 8号线 - 南北向西部
    {
      id: "line-8",
      name: "8号线",
      color: "#00954C",
      stations: [
        { id: "s8-1", name: "凤凰新村", lineId: "line-8", x: 100, y: 1100, foods: [] },
        { id: "s8-2", name: "沙园", lineId: "line-8", x: 200, y: 1100, foods: [] },
        { id: "s8-3", name: "宝岗大道", lineId: "line-8", x: 310, y: 1100, foods: [] },
        { id: "s8-4", name: "昌岗", lineId: "line-8", x: 410, y: 1100, foods: [] },
        { id: "s8-5", name: "晓港", lineId: "line-8", x: 510, y: 1100, foods: [] },
        { id: "s8-6", name: "中大", lineId: "line-8", x: 610, y: 1100, foods: [] },
        { id: "s8-7", name: "鹭江", lineId: "line-8", x: 710, y: 1100, foods: [] },
        { id: "s8-8", name: "客村", lineId: "line-8", x: 810, y: 1100, foods: [] },
        { id: "s8-9", name: "赤岗", lineId: "line-8", x: 910, y: 1100, foods: [] },
        { id: "s8-10", name: "磨碟沙", lineId: "line-8", x: 1020, y: 1100, foods: [] },
        { id: "s8-11", name: "新港东", lineId: "line-8", x: 1130, y: 1100, foods: [] },
        { id: "s8-12", name: "琶洲", lineId: "line-8", x: 1230, y: 1100, foods: [] },
        { id: "s8-13", name: "万胜围", lineId: "line-8", x: 1340, y: 1100, foods: [] },
      ],
    },
    // 9号线 - 东西向北部
    {
      id: "line-9",
      name: "9号线",
      color: "#00A4C8",
      stations: [
        { id: "s9-1", name: "飞鹅岭", lineId: "line-9", x: 300, y: 200, foods: [] },
        { id: "s9-2", name: "花都汽车城", lineId: "line-9", x: 410, y: 200, foods: [] },
        { id: "s9-3", name: "广州北站", lineId: "line-9", x: 530, y: 200, foods: [] },
        { id: "s9-4", name: "花城路", lineId: "line-9", x: 640, y: 200, foods: [] },
        { id: "s9-5", name: "花果山公园", lineId: "line-9", x: 770, y: 200, foods: [] },
        { id: "s9-6", name: "花都广场", lineId: "line-9", x: 890, y: 200, foods: [] },
        { id: "s9-7", name: "马鞍山公园", lineId: "line-9", x: 1020, y: 200, foods: [] },
        { id: "s9-8", name: "莲塘", lineId: "line-9", x: 1130, y: 200, foods: [] },
        { id: "s9-9", name: "清布", lineId: "line-9", x: 1230, y: 200, foods: [] },
        { id: "s9-10", name: "高增", lineId: "line-9", x: 1330, y: 200, foods: [] },
      ],
    },
    // 13号线 - 东西向东部
    {
      id: "line-13",
      name: "13号线",
      color: "#E5902B",
      stations: [
        { id: "s13-1", name: "鱼珠", lineId: "line-13", x: 1900, y: 850, foods: [] },
        { id: "s13-2", name: "裕丰围", lineId: "line-13", x: 2010, y: 850, foods: [] },
        { id: "s13-3", name: "双岗", lineId: "line-13", x: 2120, y: 850, foods: [] },
        { id: "s13-4", name: "南海神庙", lineId: "line-13", x: 2250, y: 850, foods: [] },
        { id: "s13-5", name: "夏园", lineId: "line-13", x: 2360, y: 850, foods: [] },
        { id: "s13-6", name: "南岗", lineId: "line-13", x: 2470, y: 850, foods: [] },
        { id: "s13-7", name: "沙村", lineId: "line-13", x: 2580, y: 850, foods: [] },
        { id: "s13-8", name: "白江", lineId: "line-13", x: 2690, y: 850, foods: [] },
        { id: "s13-9", name: "新塘", lineId: "line-13", x: 2800, y: 850, foods: [] },
        { id: "s13-10", name: "官湖", lineId: "line-13", x: 2910, y: 850, foods: [] },
        { id: "s13-11", name: "新沙", lineId: "line-13", x: 3020, y: 850, foods: [] },
      ],
    },
    // 14号线 - 东北-西南向
    {
      id: "line-14",
      name: "14号线",
      color: "#DFAE32",
      stations: [
        { id: "s14-1", name: "嘉禾望岗", lineId: "line-14", x: 950, y: 100, foods: [] },
        { id: "s14-2", name: "白云东平", lineId: "line-14", x: 1070, y: 50, foods: [] },
        { id: "s14-3", name: "夏良", lineId: "line-14", x: 1180, y: 50, foods: [] },
        { id: "s14-4", name: "太和", lineId: "line-14", x: 1290, y: 50, foods: [] },
        { id: "s14-5", name: "竹料", lineId: "line-14", x: 1400, y: 50, foods: [] },
        { id: "s14-6", name: "钟落潭", lineId: "line-14", x: 1520, y: 50, foods: [] },
        { id: "s14-7", name: "马沥", lineId: "line-14", x: 1630, y: 50, foods: [] },
        { id: "s14-8", name: "新和", lineId: "line-14", x: 1740, y: 50, foods: [] },
        { id: "s14-9", name: "太平", lineId: "line-14", x: 1850, y: 50, foods: [] },
        { id: "s14-10", name: "神岗", lineId: "line-14", x: 1960, y: 50, foods: [] },
        { id: "s14-11", name: "竹料", lineId: "line-14", x: 2070, y: 50, foods: [] },
        { id: "s14-12", name: "从化客运站", lineId: "line-14", x: 2210, y: 50, foods: [] },
        { id: "s14-13", name: "东风", lineId: "line-14", x: 2320, y: 50, foods: [] },
      ],
    },
    // 18号线 - 改为横向展示
    {
      id: "line-18",
      name: "18号线",
      color: "#5DADE2",
      stations: [
        { id: "s18-1", name: "万顷沙", lineId: "line-18", x: 100, y: 1250, foods: [] },
        { id: "s18-2", name: "横沥", lineId: "line-18", x: 300, y: 1250, foods: [] },
        { id: "s18-3", name: "番禺广场", lineId: "line-18", x: 500, y: 1250, foods: [] },
        { id: "s18-4", name: "南村万博", lineId: "line-18", x: 700, y: 1250, foods: [] },
        { id: "s18-5", name: "沙溪", lineId: "line-18", x: 900, y: 1250, foods: [] },
        { id: "s18-6", name: "龙潭", lineId: "line-18", x: 1100, y: 1250, foods: [] },
        { id: "s18-7", name: "磨碟沙", lineId: "line-18", x: 1300, y: 1250, foods: [] },
        { id: "s18-8", name: "冼村", lineId: "line-18", x: 1500, y: 1250, foods: [] },
        { id: "s18-9", name: "广州东站", lineId: "line-18", x: 1700, y: 1250, foods: [] },
      ],
    },
    // 21号线 - 东西向
    {
      id: "line-21",
      name: "21号线",
      color: "#874EA0",
      stations: [
        { id: "s21-1", name: "天河公园", lineId: "line-21", x: 1200, y: 750, foods: [] },
        { id: "s21-2", name: "棠东", lineId: "line-21", x: 1310, y: 750, foods: [] },
        { id: "s21-3", name: "黄村", lineId: "line-21", x: 1420, y: 750, foods: [] },
        { id: "s21-4", name: "大观南路", lineId: "line-21", x: 1540, y: 750, foods: [] },
        { id: "s21-5", name: "世界大观", lineId: "line-21", x: 1660, y: 750, foods: [] },
        { id: "s21-6", name: "奥体中心", lineId: "line-21", x: 1780, y: 750, foods: [] },
        { id: "s21-7", name: "黄村北", lineId: "line-21", x: 1890, y: 750, foods: [] },
        { id: "s21-8", name: "科学城", lineId: "line-21", x: 2000, y: 750, foods: [] },
        { id: "s21-9", name: "神舟路", lineId: "line-21", x: 2110, y: 750, foods: [] },
        { id: "s21-10", name: "科学广场", lineId: "line-21", x: 2230, y: 750, foods: [] },
        { id: "s21-11", name: "苏元", lineId: "line-21", x: 2340, y: 750, foods: [] },
        { id: "s21-12", name: "水西", lineId: "line-21", x: 2450, y: 750, foods: [] },
        { id: "s21-13", name: "长平", lineId: "line-21", x: 2560, y: 750, foods: [] },
        { id: "s21-14", name: "金坑", lineId: "line-21", x: 2670, y: 750, foods: [] },
        { id: "s21-15", name: "镇龙西", lineId: "line-21", x: 2780, y: 750, foods: [] },
        { id: "s21-16", name: "镇龙", lineId: "line-21", x: 2890, y: 750, foods: [] },
        { id: "s21-17", name: "中新", lineId: "line-21", x: 3000, y: 750, foods: [] },
        { id: "s21-18", name: "坑贝", lineId: "line-21", x: 3110, y: 750, foods: [] },
        { id: "s21-19", name: "凤岗", lineId: "line-21", x: 3220, y: 750, foods: [] },
        { id: "s21-20", name: "朱村", lineId: "line-21", x: 3330, y: 750, foods: [] },
        { id: "s21-21", name: "山田", lineId: "line-21", x: 3440, y: 750, foods: [] },
        { id: "s21-22", name: "钟岗", lineId: "line-21", x: 3550, y: 750, foods: [] },
        { id: "s21-23", name: "增城广场", lineId: "line-21", x: 3670, y: 750, foods: [] },
      ],
    },
    // APM线 - 改为横向展示，大幅增加间距
    {
      id: "line-apm",
      name: "APM线",
      color: "#70C8E9",
      stations: [
        { id: "sapm-1", name: "林和西", lineId: "line-apm", x: 1350, y: 550, foods: [] },
        { id: "sapm-2", name: "体育中心南", lineId: "line-apm", x: 1460, y: 550, foods: [] },
        { id: "sapm-3", name: "石牌桥", lineId: "line-apm", x: 1570, y: 550, foods: [] },
        { id: "sapm-4", name: "岗顶", lineId: "line-apm", x: 1680, y: 550, foods: [] },
        { id: "sapm-5", name: "华师", lineId: "line-apm", x: 1790, y: 550, foods: [] },
        { id: "sapm-6", name: "五山", lineId: "line-apm", x: 1900, y: 550, foods: [] },
        { id: "sapm-7", name: "天河南", lineId: "line-apm", x: 2010, y: 550, foods: [] },
        { id: "sapm-8", name: "体育西路", lineId: "line-apm", x: 2120, y: 550, foods: [] },
        { id: "sapm-9", name: "黄埔大道", lineId: "line-apm", x: 2230, y: 550, foods: [] },
        { id: "sapm-10", name: "妇儿中心", lineId: "line-apm", x: 2350, y: 550, foods: [] },
        { id: "sapm-11", name: "花城大道", lineId: "line-apm", x: 2470, y: 550, foods: [] },
        { id: "sapm-12", name: "广州塔", lineId: "line-apm", x: 2580, y: 550, foods: [] },
      ],
    },
    // 广佛线 - 增加间距避免长名称站点重叠
    {
      id: "line-gf",
      name: "广佛线",
      color: "#F3C324",
      stations: [
        { id: "sgf-1", name: "新城东", lineId: "line-gf", x: 50, y: 900, foods: [] },
        { id: "sgf-2", name: "东平", lineId: "line-gf", x: 150, y: 900, foods: [] },
        { id: "sgf-3", name: "世纪莲", lineId: "line-gf", x: 250, y: 900, foods: [] },
        { id: "sgf-4", name: "澜石", lineId: "line-gf", x: 350, y: 900, foods: [] },
        { id: "sgf-5", name: "魁奇路", lineId: "line-gf", x: 450, y: 900, foods: [] },
        { id: "sgf-6", name: "季华园", lineId: "line-gf", x: 550, y: 900, foods: [] },
        { id: "sgf-7", name: "同济路", lineId: "line-gf", x: 650, y: 900, foods: [] },
        { id: "sgf-8", name: "祖庙", lineId: "line-gf", x: 750, y: 900, foods: [] },
        { id: "sgf-9", name: "普君北路", lineId: "line-gf", x: 860, y: 900, foods: [] },
        { id: "sgf-10", name: "朝安", lineId: "line-gf", x: 970, y: 900, foods: [] },
        { id: "sgf-11", name: "桂城", lineId: "line-gf", x: 1070, y: 900, foods: [] },
        { id: "sgf-12", name: "南桂路", lineId: "line-gf", x: 1170, y: 900, foods: [] },
        { id: "sgf-13", name: "雷岗", lineId: "line-gf", x: 1270, y: 900, foods: [] },
        { id: "sgf-14", name: "千灯湖", lineId: "line-gf", x: 1370, y: 900, foods: [] },
        { id: "sgf-15", name: "金融高新区", lineId: "line-gf", x: 1500, y: 900, foods: [] },
        { id: "sgf-16", name: "龙溪", lineId: "line-gf", x: 1610, y: 900, foods: [] },
        { id: "sgf-17", name: "菊树", lineId: "line-gf", x: 1710, y: 900, foods: [] },
        { id: "sgf-18", name: "西朗", lineId: "line-gf", x: 1810, y: 900, foods: [] },
        { id: "sgf-19", name: "鹤洞", lineId: "line-gf", x: 1910, y: 900, foods: [] },
        { id: "sgf-20", name: "沙涌", lineId: "line-gf", x: 2010, y: 900, foods: [] },
        { id: "sgf-21", name: "燕岗", lineId: "line-gf", x: 2110, y: 900, foods: [] },
        { id: "sgf-22", name: "石溪", lineId: "line-gf", x: 2210, y: 900, foods: [] },
        { id: "sgf-23", name: "南洲", lineId: "line-gf", x: 2310, y: 900, foods: [] },
        { id: "sgf-24", name: "沥滘", lineId: "line-gf", x: 2410, y: 900, foods: [] },
      ],
    },
  ],
};

// LocalStorage 管理
const STORAGE_KEY = "food-map-data";

export const storage = {
  getData(): AppData {
    if (typeof window === "undefined") return initialData;

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // 首次使用，初始化数据
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
      }

      const parsedData = JSON.parse(data) as AppData & { version?: string };

      // 检查数据版本，如果版本不匹配则更新数据
      if (!parsedData.version || parsedData.version !== DATA_VERSION) {
        console.log("数据版本已更新，正在重置数据...");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
      }

      return parsedData;
    } catch (error) {
      console.error("读取数据失败:", error);
      return initialData;
    }
  },

  saveData(data: AppData): void {
    if (typeof window === "undefined") return;

    try {
      // 保存时确保包含版本号
      const dataWithVersion = { ...data, version: DATA_VERSION };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));
    } catch (error) {
      console.error("保存数据失败:", error);
    }
  },

  resetData(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      // 强制刷新页面以加载新数据
      window.location.reload();
    } catch (error) {
      console.error("重置数据失败:", error);
    }
  },
};

// 美食分类选项
export const FOOD_CATEGORIES: FoodCategory[] = [
  "快餐",
  "正餐",
  "小吃",
  "奶茶",
  "咖啡",
  "甜品",
  "烧烤",
  "火锅",
  "酒吧",
  "其他",
];

// 价格区间选项
export const PRICE_RANGES: PriceRange[] = [
  "30元以下",
  "30-50元",
  "50-100元",
  "100-150元",
  "100-200元",
  "200元以上",
];
