# MLBB Counter Pick & Meta Combo Pro

เว็บช่วยดราฟต์และแก้ทางฮีโร่ **Mobile Legends: Bang Bang (MLBB)** แบบเรียลไทม์ อ้างอิงข้อมูลสถิติ Mythical Glory+ ล่าสุด

## ✨ ฟีเจอร์หลัก
- **ครบ 133 ฮีโร่ล่าสุด** พร้อมข้อมูล Win Rate, Ban Rate, Pick Rate และ Counter / Synergy
- **ระบบจำลองดราฟต์ 10 Ban + 5v5 (ฝั่งฟ้า vs ฝั่งแดง)**:
  - กดที่ช่องแบนหรือช่องเลือกตัวละคร (`S1–S5`) เพื่อเปิด Popup เลือกฮีโร่เข้าตำแหน่งนั้นทันที
  - ปุ่มสลับฝั่ง (`🔵 ⇄ สลับตัวละครฝั่งฟ้า ↔ ฝั่งแดง 🔴`) สลับทั้งตัวแบน ตัวที่เลือก และ Battle Spell
- **แนะนำ Battle Spell (12 สเปวจริง) & ไอเทมแก้ทาง (42 ไอเทม Meta)**:
  - แนะนำสเปวข้างตัวละครที่เลือกทุกช่อง พร้อมหน้าต่างเจาะลึกไอเทมและสเปวแก้ทางทีมศัตรู
- **คลัง 23 Meta Combo (Duo / Trio / 5-Man Squad)**:
  - แนะนำคอมโบที่พร้อมเล่นตามตัวที่ไม่ติดแบน พร้อมปุ่มกดจัดลงทีมอัตโนมัติ

## 🚀 วิธีรันใช้งานบนเครื่อง
สามารถเปิดผ่าน Local Web Server หรือเปิดผ่าน **GitHub Pages** ได้ทันที:

```bash
npx serve .
```
หรือรันด้วย Node.js:
```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path'),m={'.html':'text/html;charset=utf-8','.css':'text/css;charset=utf-8','.js':'application/javascript;charset=utf-8','.png':'image/png'};http.createServer((q,s)=>{const f=path.join('.',q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end('Not found');}s.writeHead(200,{'Content-Type':m[path.extname(f).toLowerCase()]||'application/octet-stream'});fs.createReadStream(f).pipe(s);}).listen(8090,()=>console.log('Server running at http://localhost:8090'));"
```
