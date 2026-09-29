// Tao 3 file PDF CV (EN / VI / ZH) bang cach "in" chinh index.html bang Chrome headless.
//
// Chay tu thu muc goc repo:
//   $env:NODE_PATH='<duong-dan node_modules co playwright-core>'
//   node tools/make-cv-pdfs.js
//
// Yeu cau: Node.js + Google Chrome (hoac Edge) + playwright-core.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const REPO = path.resolve(__dirname, "..");
const OUTDIR = path.join(REPO, "assets");
const PORT = 8099;
const CHROME = process.env.CV_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const LANGS = ["en", "vi", "zh"];
const FILES = {
  en: "CV_DuongTien_EN.pdf",
  vi: "CV_DuongTien_VI.pdf",
  zh: "CV_DuongTien_ZH.pdf",
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const file = path.join(REPO, urlPath.replace(/^\/+/, ""));
  if (!file.startsWith(REPO)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
});

(async () => {
  await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME,
    args: ["--no-sandbox", "--font-render-hinting=none"],
  });

  for (const lang of LANGS) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
    await ctx.addInitScript((code) => {
      try {
        localStorage.setItem("dt-lang", code);
        localStorage.setItem("dt-theme", "light");
      } catch (e) {}
    }, lang);

    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: `
        .reveal{opacity:1!important;transform:none!important}
        .nav,.progress,.totop,.toast{display:none!important}
        body{background:#fff!important}
        .section{padding:34px 0!important}
        .hero{padding-top:24px!important}
      `,
    });
    await page.waitForTimeout(900);

    const out = path.join(OUTDIR, FILES[lang]);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
    });
    const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(2);
    console.log(`${lang}: ${FILES[lang]} (${mb} MB)`);
    await ctx.close();
  }

  await browser.close();
  server.close();
})().catch((e) => {
  console.error("LOI: " + (e && e.message ? e.message : String(e)));
  process.exit(1);
});
