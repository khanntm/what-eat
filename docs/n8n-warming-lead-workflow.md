# Hướng dẫn Chi Tiết: Xây dựng Workflow "Warming Lead" bằng n8n

> **Dành cho người mới bắt đầu - Step by Step từ A đến Z**

---

## Mục lục

- [PHẦN 0: Hiểu tổng quan hệ thống](#phần-0-hiểu-tổng-quan-hệ-thống)
- [PHẦN 1: Cài đặt n8n](#phần-1-cài-đặt-n8n)
- [PHẦN 2: Tạo Zalo App & Lấy API Credentials](#phần-2-tạo-zalo-app--lấy-api-credentials)
- [PHẦN 3: Tạo Telegram Bot (để nhận alert lỗi)](#phần-3-tạo-telegram-bot)
- [PHẦN 4: Tìm hiểu Sandbox CRM API](#phần-4-tìm-hiểu-sandbox-crm-api)
- [PHẦN 5: Build Workflow trong n8n](#phần-5-build-workflow-trong-n8n)
- [PHẦN 6: Test & Go Live](#phần-6-test--go-live)

---

## PHẦN 0: Hiểu tổng quan hệ thống

### Hệ thống hiện tại của client

```
LadiPage ──────── Thu lead (khách điền form)
Sandbox CRM ───── Quản trị đơn hàng & Telesale
Zalo OA/ZNS ───── Gửi tin nhắn cho khách
Botcake ───────── Chatbot
```

### Flow mình cần xây:

```
Khách điền form trên LadiPage
        │
        ▼
   n8n nhận data (qua Webhook)
        │
        ▼
   Chuẩn hóa SĐT, tên, lọc trùng
        │
        ▼
   Lưu lead vào Sandbox CRM
        │
        ▼
   Đợi 10 giây
        │
        ▼
   Gửi ZNS Video Bác sĩ qua Zalo
        │
        ▼
   Đợi 2 phút
        │
        ▼
   Gửi ZNS Bảng giá qua Zalo
        │
        ▼
   Thông báo Sandbox → Telesale bốc máy gọi ngay
        │
        ▼
   (Nếu lỗi bất kỳ bước nào → Gửi alert Telegram)
```

---

## PHẦN 1: Cài đặt n8n

Bạn có 2 lựa chọn:

### Cách 1: n8n Cloud (Dễ nhất - Khuyên dùng để bắt đầu)

1. Truy cập: https://n8n.io
2. Click **"Get started free"**
3. Đăng ký tài khoản bằng email
4. Bạn sẽ có 14 ngày dùng thử miễn phí
5. Sau khi đăng nhập → bạn sẽ thấy giao diện n8n dashboard

> Ưu điểm: Không cần cài gì, chạy ngay trên trình duyệt

### Cách 2: Self-host bằng Docker (Nếu muốn miễn phí lâu dài)

Yêu cầu: Có 1 VPS (server) Linux, đã cài Docker.

**Bước 1:** SSH vào server

```bash
ssh root@YOUR_SERVER_IP
```

**Bước 2:** Tạo thư mục cho n8n

```bash
mkdir -p /root/n8n-data
```

**Bước 3:** Chạy n8n bằng Docker

```bash
docker run -d \
  --name n8n \
  --restart always \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=MatKhauCuaBan123 \
  -e WEBHOOK_URL=https://your-domain.com/ \
  -e GENERIC_TIMEZONE=Asia/Ho_Chi_Minh \
  -v /root/n8n-data:/home/node/.n8n \
  n8nio/n8n
```

> Thay `MatKhauCuaBan123` bằng mật khẩu mạnh
> Thay `https://your-domain.com/` bằng domain thật của bạn

**Bước 4:** Truy cập n8n

- Mở trình duyệt: `http://YOUR_SERVER_IP:5678`
- Đăng nhập bằng user/pass đã set ở trên

**Bước 5 (Khuyến nghị):** Cài Nginx + SSL để có HTTPS

```bash
# Cài Nginx
apt update && apt install -y nginx certbot python3-certbot-nginx

# Tạo config Nginx
cat > /etc/nginx/sites-available/n8n << 'EOF'
server {
    listen 80;
    server_name n8n.your-domain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# Cài SSL miễn phí
certbot --nginx -d n8n.your-domain.com
```

### Kiểm tra n8n đã chạy chưa

- Mở trình duyệt → truy cập URL n8n
- Bạn sẽ thấy giao diện như hình: một canvas trắng với nút "+" ở giữa
- Click "+" → bạn sẽ thấy danh sách các node có sẵn

> **Xong bước này = bạn đã có n8n sẵn sàng dùng**

---

## PHẦN 2: Tạo Zalo App & Lấy API Credentials

### Bước 1: Tạo tài khoản Zalo Developers

1. Truy cập: https://developers.zalo.me
2. Đăng nhập bằng tài khoản Zalo cá nhân
3. Click **"Tạo ứng dụng"** (hoặc "Create App")

### Bước 2: Tạo ứng dụng mới

1. Chọn loại: **"Ứng dụng cho Official Account"**
2. Điền tên app: VD `Warming Lead Workflow`
3. Điền mô tả
4. Submit → bạn sẽ nhận được:
   - **App ID** (ghi lại)
   - **Secret Key** (ghi lại, giữ bí mật)

### Bước 3: Liên kết với Zalo Official Account (OA)

1. Trong trang quản lý app → vào tab **"Official Account"**
2. Click **"Liên kết OA"**
3. Chọn OA của client → Xác nhận
4. Cấp các quyền:
   - `send_message` (gửi tin nhắn)
   - `manage_follower` (quản lý follower)

### Bước 4: Lấy Access Token & Refresh Token

Đây là bước QUAN TRỌNG NHẤT. Zalo dùng OAuth2.

**4a. Lấy Authorization Code:**

Mở trình duyệt, truy cập URL sau (thay APP_ID bằng App ID thật):

```
https://oauth.zaloapp.com/v4/oa/permission?app_id=APP_ID&redirect_uri=https://YOUR_CALLBACK_URL
```

> `redirect_uri` phải trùng với URL bạn đã đăng ký trong app settings.
> Nếu chưa có server callback, dùng tạm: https://callback.your-domain.com
> Hoặc dùng tool như https://webhook.site để bắt callback

Sau khi đồng ý → Zalo sẽ redirect về callback URL kèm `code`:
```
https://your-callback.com?code=AUTHORIZATION_CODE
```

**4b. Đổi code lấy Access Token:**

Dùng Postman hoặc curl:

```bash
curl -X POST "https://oauth.zaloapp.com/v4/oa/access_token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "secret_key: SECRET_KEY_CUA_BAN" \
  -d "code=AUTHORIZATION_CODE&app_id=APP_ID_CUA_BAN&grant_type=authorization_code"
```

Kết quả trả về:

```json
{
  "access_token": "xxx...xxx",
  "refresh_token": "yyy...yyy",
  "expires_in": "3600"
}
```

> **GHI LẠI CẢ 2 TOKEN NÀY. Đặc biệt refresh_token rất quan trọng!**

### Bước 5: Đăng ký ZNS Template

1. Truy cập: https://account.zalo.cloud → chọn ZNS
2. Tạo template mới:
   - **Template 1: Video Bác sĩ** → loại template có media/video
   - **Template 2: Bảng giá** → loại template text hoặc có hình
3. Điền nội dung template theo yêu cầu client
4. Submit để Zalo review (thường 1-3 ngày)
5. Sau khi approved → bạn sẽ nhận **Template ID** cho mỗi template

> **Ghi lại Template ID** của cả 2 template (video bác sĩ + bảng giá)

### Tóm tắt: Những gì bạn cần có sau phần này

| Thông tin | Ví dụ |
|-----------|-------|
| App ID | 1234567890 |
| Secret Key | AbCdEfGh123 |
| Access Token | xxx...xxx |
| Refresh Token | yyy...yyy |
| ZNS Template ID (Video) | 230015 |
| ZNS Template ID (Bảng giá) | 230016 |
| OA ID | 4321... |

---

## PHẦN 3: Tạo Telegram Bot

Mục đích: Khi workflow lỗi → tự động gửi tin nhắn cảnh báo về Telegram.

### Bước 1: Tạo Bot

1. Mở Telegram → tìm **@BotFather**
2. Gửi lệnh: `/newbot`
3. Đặt tên cho bot: VD `Warming Lead Alert Bot`
4. Đặt username: VD `warming_lead_alert_bot`
5. BotFather sẽ gửi cho bạn **Bot Token** dạng:
   ```
   7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   → **Ghi lại token này**

### Bước 2: Tạo Group nhận Alert

1. Tạo group Telegram mới (VD: "Warming Lead Alerts")
2. Thêm bot vừa tạo vào group
3. Gửi 1 tin nhắn bất kỳ trong group

### Bước 3: Lấy Chat ID của Group

Mở trình duyệt, truy cập:
```
https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
```

Thay `<BOT_TOKEN>` bằng token thật. VD:
```
https://api.telegram.org/bot7123456789:AAHxxxxxxxxx/getUpdates
```

Trong kết quả JSON, tìm `"chat":{"id": -123456789}` → số âm đó là **Chat ID**.

> **Ghi lại Chat ID** (dạng -123456789)

### Bước 4: Test gửi tin nhắn

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/sendMessage" \
  -d "chat_id=CHAT_ID&text=Test alert tu n8n"
```

Nếu nhận được tin nhắn trong group → OK!

### Tóm tắt:

| Thông tin | Ví dụ |
|-----------|-------|
| Bot Token | 7123456789:AAHxxx... |
| Chat ID | -987654321 |

---

## PHẦN 4: Tìm hiểu Sandbox CRM API

### Bước 1: Xin API Documentation từ Sandbox

Liên hệ Sandbox CRM (hoặc hỏi client) để lấy:

1. **API Base URL** - VD: `https://api.sandbox.com.vn/v1`
2. **API Key hoặc Token** - để xác thực
3. **API Documentation** - danh sách endpoint

### Bước 2: Các endpoint bạn sẽ cần

Hỏi Sandbox hoặc tìm trong docs:

| Chức năng | Method | Endpoint (ví dụ) |
|-----------|--------|-------------------|
| Tạo lead mới | POST | `/leads` |
| Tìm lead theo SĐT | GET | `/leads?phone=0912345678` |
| Cập nhật lead | PUT | `/leads/{id}` |
| Gán lead cho nhân viên | POST | `/leads/{id}/assign` |
| Tạo thông báo | POST | `/notifications` |

### Bước 3: Test API bằng Postman

1. Download Postman: https://www.postman.com/downloads
2. Tạo request mới:
   - Method: GET
   - URL: `https://api.sandbox.com.vn/v1/leads`
   - Header: `Authorization: Bearer API_KEY_CUA_BAN`
3. Click Send → xem kết quả

Nếu nhận được response 200 OK → API hoạt động!

### Tóm tắt:

| Thông tin | Giá trị |
|-----------|---------|
| API Base URL | (từ Sandbox docs) |
| API Key/Token | (từ Sandbox) |
| Endpoint tạo lead | (từ Sandbox docs) |
| Endpoint tìm lead | (từ Sandbox docs) |
| Endpoint gán lead | (từ Sandbox docs) |

---

## PHẦN 5: Build Workflow trong n8n

> **Đây là phần chính. Mỗi bước dưới đây tương ứng với 1 node trong n8n.**

### 5.0: Tạo Workflow mới

1. Mở n8n dashboard
2. Click **"New Workflow"** (hoặc nút "+")
3. Đặt tên: `Warming Lead - Zalo ZNS`

---

### 5.1: NODE 1 - Webhook (Nhận data từ LadiPage)

**Mục đích:** Nhận data khi khách điền form trên LadiPage

**Cách tạo:**
1. Click "+" trên canvas
2. Tìm node **"Webhook"**
3. Cấu hình:
   - HTTP Method: `POST`
   - Path: `warming-lead` (bạn tự đặt)
4. Click **"Listen for Test Event"** (để test)

Sau khi tạo, n8n sẽ cho bạn URL dạng:
```
https://your-n8n-domain.com/webhook/warming-lead
```

> **Copy URL này** → dán vào LadiPage

**Cấu hình LadiPage:**
1. Mở LadiPage editor → chọn form
2. Vào phần "Tích hợp" hoặc "Webhook"
3. Thêm webhook URL: `https://your-n8n-domain.com/webhook/warming-lead`
4. Method: POST
5. Lưu & publish landing page

**Test:**
- Điền form trên LadiPage
- Quay lại n8n → bạn sẽ thấy data hiện ra dạng:

```json
{
  "name": "Nguyen Van A",
  "phone": "0912345678",
  "email": "a@gmail.com",
  "source": "ladipage-bacsi"
}
```

---

### 5.2: NODE 2 - Function (Chuẩn hóa dữ liệu)

**Mục đích:** Chuẩn hóa SĐT, tên, lọc dữ liệu rác

**Cách tạo:**
1. Click "+" → tìm node **"Code"** (hoặc "Function")
2. Chọn ngôn ngữ: **JavaScript**
3. Dán code sau:

```javascript
// Lấy data từ webhook
const items = $input.all();
const results = [];

for (const item of items) {
  let phone = String(item.json.phone || '').trim();
  let name = String(item.json.name || '').trim();

  // === CHUẨN HÓA SĐT ===
  // Bỏ khoảng trắng, dấu gạch
  phone = phone.replace(/[\s\-\.]/g, '');

  // Chuyển +84 hoặc 84 về 0
  if (phone.startsWith('+84')) {
    phone = '0' + phone.slice(3);
  } else if (phone.startsWith('84') && phone.length === 11) {
    phone = '0' + phone.slice(2);
  }

  // Kiểm tra SĐT hợp lệ (10 số, bắt đầu bằng 0)
  const isValidPhone = /^0\d{9}$/.test(phone);

  if (!isValidPhone) {
    // SĐT không hợp lệ → bỏ qua
    continue;
  }

  // === CHUẨN HÓA TÊN ===
  // Bỏ khoảng trắng thừa
  name = name.replace(/\s+/g, ' ');

  // Viết hoa chữ cái đầu mỗi từ
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  results.push({
    json: {
      name: name,
      phone: phone,
      email: item.json.email || '',
      source: item.json.source || 'ladipage',
      created_at: new Date().toISOString()
    }
  });
}

return results;
```

**Kết nối:** Kéo dây từ Webhook → Code node

---

### 5.3: NODE 3 - HTTP Request (Check trùng trong Sandbox CRM)

**Mục đích:** Kiểm tra khách đã tồn tại trong CRM chưa

**Cách tạo:**
1. Click "+" → tìm **"HTTP Request"**
2. Cấu hình:
   - Method: `GET`
   - URL: `https://api.sandbox.com.vn/v1/leads`
   - Query Parameters:
     - `phone` = `{{ $json.phone }}`
   - Headers:
     - `Authorization` = `Bearer YOUR_SANDBOX_API_KEY`
   - Options → chọn **"Always Output Data"** = true (để flow không dừng khi không có kết quả)

**Kết nối:** Code → HTTP Request (Check trùng)

---

### 5.4: NODE 4 - IF (Kiểm tra kết quả trùng)

**Mục đích:** Nếu SĐT đã tồn tại → xử lý khác, nếu mới → tạo lead

**Cách tạo:**
1. Click "+" → tìm **"IF"**
2. Cấu hình điều kiện:
   - Value 1: `{{ $json.data.length }}` (hoặc tùy cấu trúc response của Sandbox)
   - Operation: `Equal`
   - Value 2: `0`
3. **True** (= chưa tồn tại) → tiếp tục tạo lead
4. **False** (= đã tồn tại) → có thể skip hoặc update

**Kết nối:** HTTP Request (Check trùng) → IF

---

### 5.5: NODE 5 - HTTP Request (Tạo Lead trong Sandbox CRM)

**Mục đích:** Tạo lead mới trong CRM

**Cách tạo:**
1. Click "+" → tìm **"HTTP Request"**
2. Đặt tên node: `Create Lead in Sandbox`
3. Cấu hình:
   - Method: `POST`
   - URL: `https://api.sandbox.com.vn/v1/leads`
   - Headers:
     - `Authorization` = `Bearer YOUR_SANDBOX_API_KEY`
     - `Content-Type` = `application/json`
   - Body (JSON):
   ```json
   {
     "name": "{{ $('Code').item.json.name }}",
     "phone": "{{ $('Code').item.json.phone }}",
     "email": "{{ $('Code').item.json.email }}",
     "source": "{{ $('Code').item.json.source }}",
     "status": "new",
     "tags": ["warming-lead", "auto"]
   }
   ```

**Kết nối:** IF (True output) → Create Lead

---

### 5.6: NODE 6 - Wait (Đợi 10 giây)

**Mục đích:** Chờ 10 giây trước khi gửi ZNS đầu tiên

**Cách tạo:**
1. Click "+" → tìm **"Wait"**
2. Cấu hình:
   - Wait: `10`
   - Unit: `Seconds`

**Kết nối:** Create Lead → Wait (10s)

---

### 5.7: NODE 7 - HTTP Request (Gửi ZNS Video Bác sĩ)

**Mục đích:** Gửi tin ZNS video bác sĩ qua Zalo

**Cách tạo:**
1. Click "+" → tìm **"HTTP Request"**
2. Đặt tên: `Send ZNS Video`
3. Cấu hình:
   - Method: `POST`
   - URL: `https://business.openapi.zalo.me/message/template`
   - Headers:
     - `access_token` = `{{ $credentials.zaloAccessToken }}`
       (hoặc hardcode token tạm thời để test)
     - `Content-Type` = `application/json`
   - Body (JSON):
   ```json
   {
     "phone": "{{ $('Code').item.json.phone }}",
     "template_id": "YOUR_VIDEO_TEMPLATE_ID",
     "template_data": {
       "customer_name": "{{ $('Code').item.json.name }}"
     }
   }
   ```

> Thay `YOUR_VIDEO_TEMPLATE_ID` bằng template ID thật từ Zalo

**Kết nối:** Wait (10s) → Send ZNS Video

---

### 5.8: NODE 8 - Wait (Đợi 2 phút)

**Cách tạo:**
1. Click "+" → tìm **"Wait"**
2. Cấu hình:
   - Wait: `2`
   - Unit: `Minutes`

**Kết nối:** Send ZNS Video → Wait (2m)

---

### 5.9: NODE 9 - HTTP Request (Gửi ZNS Bảng giá)

**Tương tự Node 7, nhưng dùng template bảng giá:**

1. Click "+" → **"HTTP Request"**
2. Đặt tên: `Send ZNS Price List`
3. Cấu hình giống Node 7 nhưng đổi:
   - `template_id`: `YOUR_PRICE_TEMPLATE_ID`
   - `template_data`: tùy template bảng giá yêu cầu field gì

**Kết nối:** Wait (2m) → Send ZNS Price List

---

### 5.10: NODE 10 - HTTP Request (Thông báo Sandbox → Telesale bốc máy)

**Mục đích:** Gán lead cho Telesale và tạo thông báo "Lead nóng"

**Cách tạo:**
1. Click "+" → **"HTTP Request"**
2. Đặt tên: `Notify Telesale`
3. Cấu hình:
   - Method: `POST`
   - URL: `https://api.sandbox.com.vn/v1/notifications` (hoặc endpoint assign lead)
   - Headers:
     - `Authorization` = `Bearer YOUR_SANDBOX_API_KEY`
   - Body:
   ```json
   {
     "lead_id": "{{ $('Create Lead in Sandbox').item.json.data.id }}",
     "message": "LEAD NONG! Khach {{ $('Code').item.json.name }} ({{ $('Code').item.json.phone }}) vua xem video + bang gia. Goi ngay!",
     "priority": "high",
     "assign_to": "telesale_team"
   }
   ```

**Kết nối:** Send ZNS Price List → Notify Telesale

---

### 5.11: Error Handling - Telegram Alert

**Mục đích:** Khi BẤT KỲ node nào lỗi → gửi cảnh báo Telegram

**Cách 1: Error Trigger Workflow (Khuyên dùng)**

Tạo 1 workflow MỚI riêng cho error handling:

1. Tạo workflow mới, đặt tên: `Error Handler - Telegram Alert`
2. Thêm node **"Error Trigger"** (node đặc biệt, chỉ chạy khi có lỗi)
3. Thêm node **"Telegram"**:
   - Credential: Thêm Telegram Bot credential
     - Bot Token: `7123456789:AAHxxx...`
   - Chat ID: `-987654321` (Chat ID của group)
   - Text:
   ```
   ⚠️ LOI WORKFLOW "Warming Lead"

   Node loi: {{ $json.execution.error.node }}
   Loi: {{ $json.execution.error.message }}
   Thoi gian: {{ $now.format('DD/MM/YYYY HH:mm:ss') }}

   Xem chi tiet: {{ $json.execution.url }}
   ```
4. Kết nối: Error Trigger → Telegram

**Liên kết Error Workflow:**
1. Quay lại workflow chính "Warming Lead"
2. Click **Settings** (biểu tượng bánh răng)
3. Mục **"Error Workflow"** → chọn `Error Handler - Telegram Alert`
4. Save

Bây giờ khi bất kỳ node nào lỗi → tự động gửi Telegram!

---

### 5.12: Workflow Auto-Refresh Zalo Token

Tạo 1 workflow RIÊNG để tự động refresh token Zalo mỗi 12 giờ:

**Tạo workflow mới:** `Zalo Token Auto Refresh`

**Node 1: Schedule Trigger**
1. Click "+" → tìm **"Schedule Trigger"**
2. Cấu hình:
   - Rule: Every `12` Hours

**Node 2: HTTP Request (Đọc token hiện tại)**
- Nếu bạn lưu token trong n8n Static Data:
  - Dùng **Code** node để đọc: `$getWorkflowStaticData('global')`

**Node 3: HTTP Request (Refresh Token)**
1. Method: `POST`
2. URL: `https://oauth.zaloapp.com/v4/oa/access_token`
3. Headers:
   - `secret_key`: `YOUR_SECRET_KEY`
   - `Content-Type`: `application/x-www-form-urlencoded`
4. Body (Form URL Encoded):
   - `refresh_token`: `{{ token hiện tại }}`
   - `app_id`: `YOUR_APP_ID`
   - `grant_type`: `refresh_token`

**Node 4: Code (Lưu token mới)**
```javascript
const staticData = $getWorkflowStaticData('global');
staticData.access_token = $json.access_token;
staticData.refresh_token = $json.refresh_token;
staticData.updated_at = new Date().toISOString();

return [{ json: { status: 'Token refreshed', updated_at: staticData.updated_at } }];
```

**Node 5: Telegram (Thông báo refresh thành công)**
```
✅ Zalo Token đã refresh thành công
Thời gian: {{ $now.format('DD/MM/YYYY HH:mm:ss') }}
```

**Kết nối:** Schedule → Code (đọc) → HTTP (refresh) → Code (lưu) → Telegram

> **Activate workflow này** (bật toggle ON) → chạy tự động mỗi 12h

---

### 5.13: Sử dụng Saved Token trong Workflow Chính

Trong workflow "Warming Lead", ở các node gửi ZNS, thay vì hardcode token, đọc từ static data:

Thêm 1 **Code** node trước node "Send ZNS Video":

```javascript
// Đọc token từ workflow "Zalo Token Auto Refresh"
// Cách 1: Dùng static data global (nếu cùng workflow)
const staticData = $getWorkflowStaticData('global');
const token = staticData.access_token;

return [{ json: { ...$json, zalo_access_token: token } }];
```

Sau đó ở node Send ZNS, dùng:
```
access_token: {{ $json.zalo_access_token }}
```

> **Lưu ý:** Nếu 2 workflow khác nhau không share static data được,
> bạn có thể lưu token vào database (PostgreSQL/MySQL) hoặc file,
> hoặc dùng n8n Credentials để lưu.

---

## PHẦN 6: Test & Go Live

### Bước 1: Test từng node

1. Trong workflow chính, click vào **từng node** và chạy test
2. Kiểm tra data chạy đúng từ node này sang node khác
3. Đặc biệt test:
   - Webhook nhận data đúng không
   - Chuẩn hóa SĐT hoạt động không
   - Gửi ZNS thành công không (dùng SĐT test)
   - Thông báo Sandbox nhận được không

### Bước 2: Test End-to-End

1. Mở landing page trên LadiPage
2. Điền form với SĐT test
3. Kiểm tra:
   - [ ] n8n webhook nhận data
   - [ ] SĐT được chuẩn hóa
   - [ ] Lead được tạo trong Sandbox CRM
   - [ ] Sau 10s nhận được ZNS video
   - [ ] Sau 2 phút nhận được ZNS bảng giá
   - [ ] Thông báo Telesale trong Sandbox
   - [ ] Nếu tạo lỗi giả → Telegram nhận alert

### Bước 3: Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Cách fix |
|-----|-------------|----------|
| Webhook không nhận data | URL sai hoặc n8n chưa listen | Kiểm tra URL, đảm bảo workflow đang Active |
| ZNS gửi lỗi 401 | Token hết hạn | Chạy refresh token workflow |
| ZNS gửi lỗi "template not found" | Template ID sai hoặc chưa approved | Kiểm tra trên Zalo dashboard |
| ZNS gửi lỗi "phone not found" | User chưa follow OA | Cần user follow OA trước |
| Sandbox API lỗi 403 | API key sai hoặc hết hạn | Kiểm tra credentials |
| Telegram không gửi được | Bot token sai hoặc bot chưa vào group | Test lại bằng curl |

### Bước 4: Go Live!

1. **Activate** workflow chính (bật toggle ON)
2. **Activate** workflow refresh token (bật toggle ON)
3. Kiểm tra LadiPage đang gửi đúng webhook URL
4. Thông báo team Telesale sẵn sàng nhận lead

---

## Sơ đồ Tổng Kết

```
┌──────────────────────────────────────────────────────┐
│                    n8n WORKFLOWS                     │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  Workflow 1: Warming Lead (Main)              │   │
│  │                                                │   │
│  │  Webhook → Code → Check Dup → IF → Create    │   │
│  │  Lead → Wait 10s → ZNS Video → Wait 2m →     │   │
│  │  ZNS Price → Notify Telesale                  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  Workflow 2: Zalo Token Refresh (Cron 12h)    │   │
│  │                                                │   │
│  │  Schedule → Read Token → Refresh API →        │   │
│  │  Save Token → Telegram Notify                 │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  Workflow 3: Error Handler                    │   │
│  │                                                │   │
│  │  Error Trigger → Telegram Alert               │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Giai đoạn 4 (Nâng cao - Làm sau)

Khi flow cơ bản ổn định, nâng cấp thêm:

### 4a: Tích hợp AI Voice
- Dùng API của FPT.AI hoặc Vbee
- Thêm node HTTP Request gọi API tạo cuộc gọi tự động
- Trigger khi lead không bắt máy sau 30 phút

### 4b: Tích hợp Claude 3.5 phân tích chân dung khách
- Thêm node HTTP Request gọi Anthropic API
- Gửi data khách hàng (lịch sử tương tác, nguồn, hành vi)
- Claude phân tích và trả về:
  - Mức độ quan tâm (nóng/ấm/lạnh)
  - Sản phẩm phù hợp
  - Gợi ý kịch bản tư vấn cho Telesale

---

> **Lưu ý cuối:** Tài liệu này là hướng dẫn chung. Một số URL API và field name
> cần điều chỉnh theo API docs thực tế của Sandbox CRM và cấu trúc template ZNS
> mà bạn đã tạo. Khi gặp vướng ở bước nào, hãy hỏi lại nhé!
