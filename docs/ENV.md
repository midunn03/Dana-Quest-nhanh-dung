# Environment Setup — Dana Quest

> Biến liệt kê dưới đây được **đối chiếu trực tiếp với source** (`server/index.mjs`, `server/auth.mjs`,
> `server/navigation.mjs`, `server/places.mjs`, `vite.config.ts`) ngày 28/10/2026. Không biến bắt buộc nào
> phải đặt trước khi chạy: cấu hình mặc định đủ cho local.

## Required variables

Không có biến bắt buộc. Mặc định đã chạy được local. Các biến tùy chọn:

`API_PORT`
- Purpose: cổng của server API chạy độc lập (`npm run api`).
- Mặc định: `3001`.
- Secret: không.

`API_HOST`
- Purpose: địa chỉ bind của server API độc lập.
- Mặc định: `127.0.0.1`.
- Secret: không.

`DANA_PRESENTATION_EVENTS`
- Purpose: bật công cụ sự kiện trình diễn (operator) cho tài khoản báo cáo. Chỉ đặt đúng `1` để bật.
- Mặc định: tắt (không đặt). Giữ cooldown 5 phút của công cụ, không tắt cooldown để ép thông báo liên tiếp.
- Secret: không.

`VALHALLA_URL`
- Purpose: dịch vụ tính tuyến đi bộ (`/api/navigation/route` sẽ gọi `new URL('route', VALHALLA_URL)`).
- Mặc định: `https://valhalla1.openstreetmap.de/`.
- Secret: không, nhưng là dependency ngoài — lỗi mạng nhà cung cấp phải được UI xử lý, không phải lỗi người dùng.

`GOOGLE_MAPS_API_KEY`
- Purpose: dùng trong `server/places.mjs` cho thông tin tham quan. Tùy chọn; dự án ưu tiên catalog biên tập có nguồn, không mua API.
- Secret: **có** (nếu có). Chỉ chạy phía server, không bao giờ expose vào bundle trình duyệt.

`GITHUB_ACTIONS`
- Purpose: CI của GitHub tự đặt. Khi đúng chuỗi truthy, `vite.config.ts` đổi `base` thành `/Dana-Quest/`.
- Secret: không.

`VITE_AUTH_API_URL`
- Purpose: **KHÔNG dùng nữa.** Dịch vụ tài khoản đã tích hợp vào Vite tại `/api/auth`. Nếu từng đặt biến này (kể cả rỗng), hãy bỏ đi rồi khởi động lại Vite.
- Secret: không.

## Local setup
1. `npm.cmd install`.
2. Dev app: `npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort` — API tài khoản tự gắn tại `/api/auth`, không cần chạy server thứ hai.
3. API độc lập (khi cần): `npm.cmd run api` (mặc định `127.0.0.1:3001`); reverse proxy `/api/*` về tiến trình này nếu tách origin.
4. Khởi động lại app sau khi đổi biến môi trường.
5. Kiểm tra: mở `http://127.0.0.1:5173/#/dang-ky`, đăng ký được tài khoản là API tài khoản hoạt động.

Không cần file `.env` cho local mặc định. Tạo `.env.example` (đã có trong repo) chỉ để tham chiếu tên biến, giá trị placeholder.

## Data storage (không phải biến môi trường nhưng gắn với môi trường chạy)
- `.data/accounts.json` — tài khoản; `.data/players/` — tiến độ/ảnh theo tài khoản; `.data/` đã bị `.gitignore` chặn và Vite chặn phục vụ qua HTTP.
- Mật khẩu băm scrypt với salt riêng; phiên là session RAM — **restart server làm mất phiên** (tài khoản vẫn còn).
- File JSON chỉ bền khi filesystem bền; khi triển khai (Render free) cần kho dữ liệu bền vững thay filesystem tạm.

## Example file: .env.example
```
# Chỉ là placeholder — local mặc định không cần đặt biến nào
API_PORT=3001
API_HOST=127.0.0.1
# DANA_PRESENTATION_EVENTS=1
# VALHALLA_URL=https://valhalla1.openstreetmap.de/
# GOOGLE_MAPS_API_KEY=<your-key-if-ever-needed>
```

## Git exclusions (đã có trong `.gitignore`, giữ nguyên)
```
.env
.env.*
!.env.example
*.pem / *.key / *.pfx / *.p12
.data/
```

## Preview and production
- `npm run build && npm start` phục vụ cả `dist` và API cùng domain; `render.yaml` là cấu hình mẫu Render.
- Set biến trong cấu hình hosting; không dùng dữ liệu production cho test local.
- Production cần HTTPS (định vị, camera, cookie), backend chạy liên tục và kho dữ liệu bền.
- Không commit `.data`, ảnh người dùng thật, hoặc secret; nếu secret lộ, rotate ngay.

## Validation and secret handling
- Chỉ `VITE_*` được nhúng vào bundle frontend — tuyệt đối không đặt secret vào biến `VITE_*`.
- Log ghi tên biến, không ghi giá trị secret; lỗi server không lộ stack/đường dẫn nội bộ cho người dùng.
- Commit `.env.example` với placeholder, không bao giờ giá trị thật.
