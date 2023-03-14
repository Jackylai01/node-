const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 開始的頁數和結束的頁數
  const startPage = 1;
  const endPage = 320;

  const resultSet = new Set(); // 儲存不重複的資料

  for (let i = startPage; i <= endPage; i++) {
    // 訪問每個分頁
    await page.goto(
      `https://www.pro360.com.tw/pro-search/interior_design?q=%E5%AE%A4%E5%85%A7%E8%A8%AD%E8%A8%88&encoded_answer=JTdCJTIyemlwX2NvZGUlMjIlM0ElMjIwJTIyJTJDJTIyRm9ybSUyMiUzQSU3QiU3RCU3RA%253D%253D&page=${i}`,
    );

    const names = await page.$$eval('.ProCardV2__businessName___r8Xt5', (els) =>
      els.map((el) => el.innerText),
    );
    console.log(`Page ${i} done.`);

    // 將爬取到的內容加入 Set 中
    names.forEach((name) => resultSet.add(name));
  }

  // 將 Set 中的資料轉換成陣列
  const resultArray = Array.from(resultSet);

  // 將爬取到的內容寫入文本檔案
  fs.writeFile('app.txt', resultArray.join('\n'), (err) => {
    if (err) throw err;
    console.log('結果已保存到 app.txt');
  });

  console.log('All done!');
  await browser.close();
})();
