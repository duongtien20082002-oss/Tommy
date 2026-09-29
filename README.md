# Portfolio — Duong Tien (UA Marketing)

Website portfolio một trang, dựng từ nội dung CV `Duong_Tien_UA MARKETING.pdf`.
Toàn bộ site nằm trong **một file `index.html`** (HTML + CSS + JS gọn trong một file), không cần build, không cần cài gì.

## Xem thử

Mở trực tiếp file `index.html` bằng trình duyệt (double-click). Không cần server.

Nếu muốn chạy qua local server:

```powershell
cd "C:\Users\Admin\Documents\Codex\Tommy"
python -m http.server 8000
# rồi mở http://localhost:8000
```

## Cấu trúc

```
portfolio/
├─ index.html                       # toàn bộ website
├─ README.md                        # file này
├─ preview-hero.png                 # ảnh xem trước giao diện
├─ tools/
│  └─ make-cv-pdfs.js               # script tạo lại 3 file PDF CV (EN/VI/ZH)
└─ assets/
   ├─ avatar.png                    # ảnh chân dung (tách từ CV, nền trong suốt)
   ├─ og-image.png                  # ảnh preview khi share link Facebook/LinkedIn
   ├─ logo-foxscore.png             # logo công ty (thẻ kinh nghiệm)
   ├─ logo-oneone.png
   ├─ logo-lg.png
   ├─ logo-kingazone.png
   ├─ CV_DuongTien_EN.pdf           # CV tiếng Anh (nút Download CV khi chọn EN)
   ├─ CV_DuongTien_VI.pdf           # CV tiếng Việt (khi chọn VI)
   ├─ CV_DuongTien_ZH.pdf           # CV tiếng Trung (khi chọn 中文)
   └─ Duong_Tien_UA_Marketing_CV.pdf # CV gốc bản thiết kế cũ (không còn dùng trên web)
```

## Nội dung lấy từ CV

- Thông tin cá nhân: tên, vị trí, email, số điện thoại, địa điểm, ngày sinh.
- Mục tiêu nghề nghiệp + 5 core strengths.
- 4 vị trí: Foxscore (05/2026–nay), One One Media (07/2025–05/2026), LG Clinic (11/2024–06/2025), King Azone JSC (04/2024–10/2024) — giữ nguyên toàn bộ bullet.
- Thị trường: Vietnam, Europe, United States, India, Brazil (Việt Nam: Facebook Ads cho nông nghiệp + dịch vụ thẩm mỹ; 4 thị trường còn lại: Meta Ads cho slot game).
- Lĩnh vực: Gaming, Nông nghiệp, Thẩm mỹ, Thể thao (4 thẻ ngành ở mục Thị trường).
- Kỹ năng: UA Marketing, Analytics & Tracking, Creative Production, Soft Skills.
- Học vấn: Greenwich Vietnam, Digital Marketing 2021–2024, tốt nghiệp loại Khá.

## Tính năng

- Song ngữ **EN / VI** — bấm nút EN|VI trên thanh menu, lựa chọn được ghi nhớ trong trình duyệt.
- Chuyển **sáng / tối** bằng nút hình mặt trời, cũng được ghi nhớ.
- Thanh tiến trình đọc trang, menu dính, highlight mục đang xem, hiệu ứng xuất hiện khi cuộn.
- Số liệu đếm động (3 năm, $150K/tháng, $6K/ngày, 4B₫...).
- Nút **Copy** cho email và số điện thoại, có thông báo nhỏ xác nhận.
- Nút tải CV (PDF) ở menu, phần Contact và footer.
- Responsive: desktop, tablet, mobile (menu thu gọn).
- Tối ưu SEO cơ bản: title, meta description, Open Graph, JSON-LD Person.

## Cách sửa nội dung

Mở `index.html` bằng editor bất kỳ. Nội dung tiếng Anh nằm trực tiếp trong HTML,
bản dịch tiếng Việt nằm trong object `I18N.vi` ở cuối file (mục `/* ---- i18n ---- */`).
Các phần tử có gắn `data-i18n="khoá"` sẽ tự đổi theo ngôn ngữ.

Muốn đổi ảnh: thay `assets/avatar.png` bằng ảnh vuông (tỉ lệ 1:1, nền trong suốt hoặc nền đặc).
Muốn đổi màu chủ đạo: sửa các biến `--accent`, `--bg`, `--sage` trong khối `:root` ở đầu file.

## File PDF của CV

Ba file PDF được tạo **từ chính trang web** (in bằng Chrome headless, theme sáng) nên luôn bám sát nội dung web:

| Ngôn ngữ | File | Nút Download CV trỏ tới |
|---|---|---|
| English | `assets/CV_DuongTien_EN.pdf` | khi chọn **EN** |
| Tiếng Việt | `assets/CV_DuongTien_VI.pdf` | khi chọn **VI** |
| 中文 | `assets/CV_DuongTien_ZH.pdf` | khi chọn **中文** |

Sau khi sửa nội dung web, tạo lại cả 3 PDF bằng:

```powershell
node tools/make-cv-pdfs.js
```

(Cần Node.js, Google Chrome và gói `playwright-core` — có thể trỏ qua biến môi trường `NODE_PATH`.)

## Đưa lên mạng (miễn phí)

Site **đã được deploy tự động** lên Vercel:

- Repo GitHub: `duongtien20082002-oss/Tommy` (nhánh `main`) — đây là bản gốc.
- Vercel project: `tommy` → **https://tommy-dusky.vercel.app**
- **Mỗi lần push lên `main`, Vercel tự build và cập nhật** (thường 20–60 giây). Chỉ cần F5 lại trang là thấy nội dung mới.

Quy trình sửa nội dung:

1. Sửa `index.html` (hoặc thay ảnh trong `assets/`).
2. `git add -A`, `git commit -m "..."`, rồi `git push`.
3. Đợi khoảng 30 giây, mở https://tommy-dusky.vercel.app và F5.

Muốn deploy thủ công ngay (không chờ Git): chạy `vercel --prod` trong thư mục này.

Phương án dự phòng: GitHub Pages (Settings → Pages → branch `main`, thư mục `/ (root)`) hoặc Netlify Drop (https://app.netlify.com/drop).

Sau khi có domain, nên cập nhật lại `og:image` trong `index.html` thành đường dẫn đầy đủ
(ví dụ `https://domain-cua-ban.com/assets/og-image.png`) để ảnh preview khi share link hiển thị đúng.
