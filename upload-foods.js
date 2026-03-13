const fs = require('fs');
const path = require('path');

// 模拟Firebase配置
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'YOUR_DATABASE_URL',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID'
};

// 模拟Firebase初始化
let database = null;
try {
  const { initializeApp } = require('firebase/app');
  const { getDatabase } = require('firebase/database');
  
  const app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.log('Firebase initialization failed:', error.message);
  console.log('Using mock data store');
}

// 模拟数据存储
let mockData = {
  version: 'v2.5.0',
  lines: []
};

// 加载初始数据
const initialDataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
try {
  const initialDataContent = fs.readFileSync(initialDataPath, 'utf8');
  // 简单解析initialData
  const linesMatch = initialDataContent.match(/lines:\s*\[(.*?)\]/s);
  if (linesMatch) {
    // 这里只是为了演示，实际应该使用更安全的解析方法
    console.log('Loaded initial data structure');
  }
} catch (error) {
  console.log('Error loading initial data:', error.message);
}

// 生成唯一ID
function generateId() {
  return 'food_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// 从CSV文件读取数据
function readCsvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(header => header.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
    
    return data;
  } catch (error) {
    console.error('Error reading CSV file:', error.message);
    return [];
  }
}

// 上传美食数据
async function uploadFoods(csvFilePath) {
  console.log('Uploading foods from:', csvFilePath);
  
  const foodsData = readCsvFile(csvFilePath);
  console.log('Found', foodsData.length, 'food items in CSV');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const foodItem of foodsData) {
    try {
      const { lineId, stationId, name, rating, category, priceRange, recommendedDish, remarks, distance } = foodItem;
      
      // 验证必填字段
      if (!lineId || !stationId || !name) {
        console.log('Skipping invalid food item:', foodItem);
        errorCount++;
        continue;
      }
      
      // 创建FoodItem对象
      const food = {
        id: generateId(),
        stationId: stationId.trim(),
        name: name.trim(),
        rating: parseFloat(rating) || 5,
        category: category.trim() || '其他',
        priceRange: priceRange.trim() || '50-100元',
        recommendedDish: recommendedDish.trim(),
        remarks: remarks.trim(),
        distance: parseInt(distance) || 0
      };
      
      console.log('Uploading food:', food.name);
      
      // 这里是模拟上传，实际应该调用firebaseStorage.addFood
      if (database) {
        // 实际的Firebase上传代码
        const { ref, get, set } = require('firebase/database');
        const dataRef = ref(database, 'foodMapData');
        const snapshot = await get(dataRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const lineIndex = data.lines.findIndex(l => l.id === lineId);
          
          if (lineIndex >= 0) {
            const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
            
            if (stationIndex >= 0) {
              if (!data.lines[lineIndex].stations[stationIndex].foods) {
                data.lines[lineIndex].stations[stationIndex].foods = [];
              }
              data.lines[lineIndex].stations[stationIndex].foods.push(food);
              await set(dataRef, data);
              console.log('Food uploaded successfully:', food.name);
              successCount++;
            } else {
              console.log('Station not found:', stationId);
              errorCount++;
            }
          } else {
            console.log('Line not found:', lineId);
            errorCount++;
          }
        } else {
          console.log('No data in Firebase');
          errorCount++;
        }
      } else {
        // 模拟上传
        console.log('Mock upload:', food.name);
        successCount++;
      }
      
      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error uploading food:', error.message);
      errorCount++;
    }
  }
  
  console.log('Upload completed:');
  console.log('Success:', successCount);
  console.log('Error:', errorCount);
  console.log('Total:', foodsData.length);
}

// 显示帮助信息
function showHelp() {
  console.log('Usage: node upload-foods.js <csv-file-path>');
  console.log('');
  console.log('CSV file format:');
  console.log('lineId,stationId,name,rating,category,priceRange,recommendedDish,remarks,distance');
  console.log('');
  console.log('Example:');
  console.log('line-1,s1-1,Example Restaurant,4.5,正餐,50-100元,Signature Dish,Good food,100');
  console.log('');
  console.log('Available line IDs:');
  console.log('- line-1 (1号线)');
  console.log('- line-2 (2号线)');
  console.log('- line-3 (3号线)');
  console.log('- line-4 (4号线)');
  console.log('- line-5 (5号线)');
  console.log('- line-6 (6号线)');
  console.log('- line-7 (7号线)');
  console.log('- line-8 (8号线)');
  console.log('- line-9 (9号线)');
  console.log('- line-13 (13号线)');
  console.log('- line-14 (14号线)');
  console.log('- line-18 (18号线)');
  console.log('- line-21 (21号线)');
  console.log('- line-apm (APM线)');
  console.log('- line-gf (广佛线)');
  console.log('');
  console.log('Station IDs format:');
  console.log('- For line-1: s1-1, s1-2, ...');
  console.log('- For line-2: s2-1, s2-2, ...');
  console.log('- And so on...');
}

// 主函数
async function main() {
  const csvFilePath = process.argv[2];
  
  if (!csvFilePath) {
    showHelp();
    process.exit(1);
  }
  
  if (!fs.existsSync(csvFilePath)) {
    console.error('CSV file not found:', csvFilePath);
    process.exit(1);
  }
  
  await uploadFoods(csvFilePath);
}

// 运行主函数
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { uploadFoods, readCsvFile };
