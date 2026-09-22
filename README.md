# Portfolio — Duong Tien (UA Marketing)

Website portfolio một trang, dựng từ nội dung CV `Duong_Tien_UA MARKETING.pdf`.
Toàn bộ site nằm trong **một file `index.html`** (HTML + CSS + JS gọn trong một file), không cần build, không cần cài gì.

## Xem thử

Mở trực tiếp file `index.html` bằng trình duyệt (double-click). Không cần server.

Nếu muốn chạy qua local server:

```powershell
cd "C:\Users\tien\Documents\ChatGPT\UA Marketing\portfolio"
python -m http.server 8000
# rồi mở http://localhost:8000
```

## Cấu trúc

```
portfolio/
├─ index.html                       # toàn bộ website
├─ README.md                        # file này
├─ preview-hero.png                 # ảnh xem trước giao diện
└─ assets/
   ├─ avatar.png                    # ảnh chân dung (tách từ CV, nền trong suốt)
   ├─ og-image.png                  # ảnh preview khi share link Facebook/LinkedIn
   └─ Duong_Tien_UA_Marketing_CV.pdf # CV gốc, dùng cho nút "Download CV"
```

## Nội dung lấy từ CV

- Thông tin cá nhân: tên, vị trí, email, số điện thoại, địa điểm, ngày sinh.
- Mục tiêu nghề nghiệp + 5 core strengths.
- 4 vị trí: Foxscore (06/2025–06/2026), One One Media (11/2023–05/2025), LG Clinic (11/2023–06/2024), King Azone JSC (04/2023–10/2023) — giữ nguyên toàn bộ bullet.
- Thị trường: Vietnam, Europe, United States, India, Brazil (Việt Nam từ chiến dịch Facebook Ads nông nghiệp, 4 thị trường còn lại từ chiến dịch Meta Ads cho slot game).
- Kỹ năng: UA Marketing, Analytics & Tracking, Creative Production, Soft Skills.
- Học vấn: Greenwich Vietnam, Digital Marketing 2021–2024, tốt nghiệp loại Khá.

## Tính năng

- Song ngữ **EN / VI** — bấm nút EN|VI trên thanh menu, lựa chọn được ghi nhớ trong trình duyệt.
- Chuyển **sáng / tối** bằng nút hình mặt trời, cũng được ghi nhớ.
- Thanh tiến trình đọc trang, menu dính, highlight mục đang xem, hiệu ứng xuất hiện khi cuộn.
- Số liệu đếm động (4+ năm, $150K/tháng, $6K/ngày, 1.2B₫...).
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

## Đưa lên mạng (miễn phí)

**Cách 1 — Netlify Drop (nhanh nhất):** vào https://app.netlify.com/drop, kéo thả nguyên thư mục `portfolio` → có link ngay.

**Cách 2 — GitHub Pages:**

1. Tạo repository mới, upload nội dung thư mục `portfolio` lên.
2. Vào Settings → Pages → Source: `Deploy from a branch` → branch `main`, thư mục `/ (root)` → Save.
3. Link dạng `https://<username>.github.io/<repo>/`.

**Cách 3 — Vercel:** kéo thả thư mục vào https://vercel.com/new.

Sau khi có domain, nên cập nhật lại `og:image` trong `index.html` thành đường dẫn đầy đủ
(ví dụ `https://domain-cua-ban.com/assets/og-image.png`) để ảnh preview khi share link hiển thị đúng.
