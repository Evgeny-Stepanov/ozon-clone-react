import fs from 'fs';
import path from 'path';

const TARGET_CATEGORIES = ['smartphones', 'laptops', 'tablets'];
const BASE_URL = 'https://dummyjson.com';
const PUBLIC_ROOT = './public/images/products';
const API_DIR = './src/features/products/api';

async function downloadFile(url, folderPath, fileName) {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());

    const filePath = path.join(folderPath, fileName);

    fs.writeFileSync(filePath, buffer);

    return folderPath.replace('./public', '') + '/' + fileName;
  } catch (err) {
    console.error(`❌ Ошибка загрузки ${url}:`, err.message);

    return null;
  }
}

async function downloadData() {
  try {
    console.log('🎯 Начинаю глубокую выкачку данных (с галереями)...');

    const requests = TARGET_CATEGORIES.map((cat) =>
      fetch(`${BASE_URL}/products/category/${cat}`).then((res) => res.json()),
    );

    const results = await Promise.all(requests);

    let allProducts = [];

    for (const data of results) {
      for (const product of data.products) {
        const productFolder = path.join(PUBLIC_ROOT, String(product.id));

        if (!fs.existsSync(productFolder))
          fs.mkdirSync(productFolder, { recursive: true });

        console.log(`📸 Качаю медиа для: ${product.title} (ID: ${product.id})`);

        const localThumbnail = await downloadFile(
          product.thumbnail,
          productFolder,
          'thumbnail.webp',
        );

        if (localThumbnail) product.thumbnail = localThumbnail;

        const localImages = [];
        for (let i = 0; i < product.images.length; i++) {
          const imgUrl = product.images[i];
          const localImgPath = await downloadFile(
            imgUrl,
            productFolder,
            `image-${i}.webp`,
          );

          if (localImgPath) localImages.push(localImgPath);
        }
        product.images = localImages;

        allProducts.push(product);
      }
    }

    const finalData = {
      categories: TARGET_CATEGORIES,
      products: allProducts,
      updatedAt: new Date().toISOString(),
    };

    if (!fs.existsSync(API_DIR)) fs.mkdirSync(API_DIR, { recursive: true });

    fs.writeFileSync(
      `${API_DIR}/products-mock.json`,
      JSON.stringify(finalData, null, 2),
    );

    console.log(`✅ Всё готово! Данные и галереи сохранены.`);
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  }
}

downloadData();
