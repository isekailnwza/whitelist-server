# Whitelist Railway Simple

ระบบ Whitelist แบบง่าย ๆ สำหรับ Railway

## วิธีใช้

1. Push folder นี้ขึ้น GitHub
2. Deploy บน Railway (เลือก Deploy from GitHub)
3. Railway จะ detect Node.js และรัน npm install + npm start

## API

- GET /config -> ดึงค่าทั้งหมด
- GET /config/:placeId -> ดึงค่า placeId เดียว
- POST /set -> ตั้งค่าใหม่

POST body ตัวอย่าง:
{
  "placeId": "123456789",
  "whitelisted": true
}
