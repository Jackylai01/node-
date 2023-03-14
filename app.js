const puppeteer = require('puppeteer');
const fs = require('fs');

//這裡只適合單頁

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://www.pro360.com.tw/pro-search/interior_design?q=%E5%AE%A4%E5%85%A7%E8%A8%AD%E8%A8%88&encoded_answer=JTdCJTIyemlwX2NvZGUlMjIlM0ElMjIwJTIyJTJDJTIyRm9ybSUyMiUzQSU3QiU3RCU3RA%253D%253D',
  );

  const names = await page.$$eval('.ProCardV2__businessName___r8Xt5', (els) =>
    els.map((el) => el.innerText),
  );
  console.log(names);

  // 將爬取到的內容寫入文本檔案
  fs.writeFile('app.txt', names.join('\n'), (err) => {
    if (err) throw err;
    console.log('結果已保存到 app.txt');
  });

  await browser.close();
})();
