# 🚀 FlashWin Landing Page

Landing page عربية احترافية (RTL) لوكالة **FlashWin** — Performance Marketing & Video Production.

- ✅ نفس تصميم وألوان ومحتوى الصفحة الأصلية **1:1**
- ✅ متجاوبة على الموبايل والتابلت والديزتوب
- ✅ فورم بيتسجل تلقائي في Google Sheets + إيميل تنبيه
- ✅ زرار واتساب عائم + Lead event على Facebook Pixel
- ✅ بدون أي backend أو framework — صفحة HTML واحدة + 5 صور

---

## 📁 بنية المشروع

```
flashwin-landing/
├── index.html              ← الصفحة الرئيسية (عدّل الإعدادات هنا)
├── privacy.html            ← سياسة الخصوصية
├── terms.html              ← شروط الاستخدام
├── assets/
│   ├── loge_flashwin.png   ← اللوجو
│   ├── luxury-food.png     ← Case Study 01
│   ├── fashion.png         ← Case Study 02
│   ├── self-care.png       ← Case Study 03
│   └── seasonal-gifts.png  ← Case Study 04
├── google-apps-script.gs   ← كود الـ Google Sheets (ينتسخ في Apps Script)
├── netlify.toml            ← إعدادات Netlify
├── _redirects              ← redirects إضافية
├── .gitignore
└── README.md               ← أنت هنا
```

---

## ⚙️ الإعدادات اللي محتاج تغيرها (3 حاجات بس)

افتح ملف **`index.html`** وروح على آخر الكود، هتلاقي بلوك اسمه `SITE_CONFIG`:

```js
const SITE_CONFIG = {
  SHEET_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',  // ← (1)
  PIXEL_ID:  'YOUR_PIXEL_ID_HERE',                // ← (2)
};
```

كمان غيّر في `<head>` رابط **`canonical`** و **`og:url`** لرابط موقعك الفعلي:

```
https://YOUR-SITE.netlify.app   ←   (3) غيّره في كل الأماكن (3 أماكن)
```

### (1) Google Sheets — خطوة بخطوة

1. ادخل [sheets.google.com](https://sheets.google.com) واعمل شيت جديد سمّيه مثلاً **"FlashWin Leads"**
2. من الشيت، روح على: **Extensions** → **Apps Script**
3. امسح أي كود موجود، انسخ محتوى ملف **`google-apps-script.gs`** كله والصقه
4. في أول سطرين غيّر:
   ```js
   const EMAIL_TO = 'your-email@example.com';  // الإيميل اللي هيوصلك عليه تنبيه
   const BRAND_NAME = 'FlashWin';              // اسم البراند
   ```
5. احفظ (Ctrl+S) — سمّه مثلاً "FlashWin Leads API"
6. دلوقتي اعمل **Deploy**:
   - اضغط **Deploy** → **New deployment**
   - في أيقونة الترس اختار **Web app**
   - **Execute as:** Me
   - **Who has access:** **Anyone** ⚠️ مهم
   - اضغط **Deploy**
   - هيطلب منك صلاحيات — وافق وكمّل
7. انسخ الـ **Web app URL** (شكله زي: `https://script.google.com/macros/s/AKfycb.../exec`)
8. حطه في `index.html` مكان `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`

#### ⚠️ ملاحظات مهمة

- **لو الإيميل ما اتبعتش**، تأكد إن الـ Gmail متفعّل عليه أقل حاجة Gmail API (المفروض شغال لو عملت الـ Deploy صح)
- **لو حصل Redirect** أو **أخطاء CORS** — عادي، الـ `mode: 'no-cors'` بيتعامل معاها. المهم الـ row يظهر في الشيت
- **لو غيّرت الكود** في Apps Script بعد أول Deploy، لازم تعمل deploy جديد من **Deploy** → **Manage deployments** → القلم الرصاص → **Version: New version** → Deploy

### (2) Facebook Pixel

1. ادخل [Meta Events Manager](https://business.facebook.com/events_manager)
2. لو مش عامل Pixel، اعمل واحد جديد وسجّل الـ ID (16 رقم)
3. حط الـ ID في `index.html` مكان `YOUR_PIXEL_ID_HERE` (هتلاقيه في **مكانين**: `fbq('init', ...)` و `<noscript>`)
4. الحدث `PageView` بيتبعت تلقائي لما حد يفتح الصفحة
5. الحدث `Lead` بيتبعت لما حد يبعت الفورم بنجاح

> **ملاحظة:** لو مش عايز تتعقب، احذف بلوك البيكسل كله (من `<script>` لحد `</noscript>`) وسيب `PIXEL_ID` فاضي في `SITE_CONFIG`.

### (3) رابط الموقع

غيّر `https://YOUR-SITE.netlify.app` في **3 أماكن** في `<head>`:
- `<link rel="canonical">`
- `<meta property="og:url">`
- `<meta property="og:image">` (URL مطلق، لازم يبدأ بـ `https://`)

---

## 🌐 الرفع على Netlify (أسرع طريقة: Drag & Drop)

### الطريقة 1: بدون تسجيل حساب (مجاني)

1. ادخل [app.netlify.com/drop](https://app.netlify.com/drop)
2. **اسحب مجلد `flashwin-landing` كامل** وارميه في الصفحة
3. استنى 10 ثواني
4. هيعطيك رابط مجاني زي: `https://random-name-12345.netlify.app`
5. ✅ خلاص، الموقع شغال على HTTPS

### الطريقة 2: بحساب GitHub (أفضل للمستقبل)

1. اعمل حساب على [github.com](https://github.com) (لو مش عامل)
2. اعمل Repository جديد سمّيه مثلاً `flashwin-landing`
3. ارفع كل الملفات:
   ```powershell
   cd C:\Users\msami\.minimax-agent\projects\flashwin-landing
   git init
   git add .
   git commit -m "Initial deploy"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/flashwin-landing.git
   git push -u origin main
   ```
4. في [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → اختار GitHub → اختار الـ repo
5. اضغط **Deploy** — وانتظر دقيقة
6. ✅ كل push جديد هيعملك deploy أوتوماتيك

### تخصيص اسم الموقع على Netlify

1. في Netlify Dashboard روح على **Site settings** → **Change site name**
2. اختار اسم متاح، مثلاً: `flashwin-agency` → هيبقى `https://flashwin-agency.netlify.app`
3. ✅ أو اربط دومين خاص بيك (مثل `flashwin.com`) من **Domain settings** → **Add custom domain**

---

## 🧪 اختبار محلي قبل الرفع

لو عايز تفتح الصفحة على جهازك قبل ما ترفعها:

```powershell
# طريقة 1: افتحها مباشرة في المتصفح
start C:\Users\msami\.minimax-agent\projects\flashwin-landing\index.html

# طريقة 2: شغّل سيرفر محلي بـ Python (لو متسطب)
cd C:\Users\msami\.minimax-agent\projects\flashwin-landing
python -m http.server 8080
# ثم افتح http://localhost:8080
```

> **ملاحظة:** الـ Pixel هيشتغل عادي، بس الـ Google Sheet webhook ممكن ما يشتغلش محلياً بسبب CORS. اختبره على Netlify بعد الرفع.

---

## ✅ Checklist قبل ما تعلن الموقع

- [ ] حطيت `SHEET_URL` في `index.html`
- [ ] حطيت `PIXEL_ID` في `index.html` (اختياري)
- [ ] غيّرت `YOUR-SITE.netlify.app` في `<head>` بـ 3 أماكن
- [ ] عملت **Test Event** على Meta Pixel helper وشفت الـ PageView بيوصل
- [ ] عبّيت الفورم بنفسي وتأكدت إن الـ row ظهر في Google Sheet
- [ ] تأكدت إن الإيميل التنبيهيوصلك
- [ ] فتحت الموقع من الموبايل وشغّلت كل حاجة
- [ ] فتحت موقع Netlify وحفظت الرابط النهائي

---

## 🛠️ تخصيصات سريعة

### تغيير رقم الواتساب

ابحث في `index.html` عن `201501593770` (هيظهر في 3 أماكن) وغيّره لرقمك بصيغة دولية بدون `+`:
- مصر: `201001234567`
- السعودية: `966501234567`
- الإمارات: `971501234567`

### تغيير روابط السوشيال

في `<footer>` ابحث عن:
```html
<a href="https://www.facebook.com/flashwinperformance">  ← فيسبوك
<a href="https://www.instagram.com/flashwinperformance"> ← انستجرام
```

### تغيير رقم البيكسل في 3 أحداث مختلفة

لو عندك أكتر من Pixel (مثلاً للـ retargeting)، ضيف أكتر من `fbq('init', '...')` و `fbq('track', '...')` call.

---

## 📞 في مشكلة؟

- **الـ Form مش بيبعت؟** افتح Console (F12) → Network → شوف الـ request. لو فيه CORS error، تأكد إن الـ Apps Script deployed as "Anyone"
- **الصور مش بتظهر على Netlify؟** تأكد إن مجلد `assets/` اترفع بالكامل (5 صور)
- **الصفحة بتظهر بخط عادي؟** الـ Google Fonts محتاجة نت — أول زيارة هتاخد ثانية زيادة
- **عينة تجربية للـ Lead:** املأ النموذج برقمك وشوف الـ row في الشيت

---

صُنع بحب لـ **FlashWin** 🚀
