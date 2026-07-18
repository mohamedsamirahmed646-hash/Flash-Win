/**
 * ============================================================
 *  FlashWin — Google Apps Script
 *  📌 بنستقبل بيانات فورم الـ Landing Page وبنحطها في الشيت
 *  📌 وفي نفس الوقت بنبعت إيميل تنبيه لكل Lead جديد
 *
 *  خطوات التركيب (مرة واحدة بس):
 *  1. افتح Google Sheets جديد
 *  2. سمّيه "FlashWin Leads" (أو أي اسم تختاره)
 *  3. من قائمة Extensions > Apps Script
 *  4. امسح أي كود موجود والصق الكود ده كله
 *  5. غيّر الإيميل في السطر EMAIL_TO
 *  6. احفظ (Ctrl+S)
 *  7. من Deploy > New Deployment
 *     - Type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  8. اضغط Deploy وانسخ الرابط
 *  9. حط الرابط ده في index.html مكان YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 * ============================================================
 */

// 📧 الإيميل اللي هيوصلك عليه تنبيه لكل Lead جديد
const EMAIL_TO = 'your-email@example.com';
// 📛 اسم البراند اللي هيظهر في الإيميل
const BRAND_NAME = 'FlashWin';


/**
 * doPost — بتشتغل لما حد يبعت الفورم
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // لو الشيت فاضي — حط الـ headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'التاريخ',
        'الوقت',
        'الاسم',
        'البراند',
        'الواتساب',
        'المجال',
        'الموقع الحالي',
        'الميزانية',
        'التحدي',
        'User Agent',
        'Referrer'
      ]);
      // نسّق الـ header
      const headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#9c7a39');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    const now = new Date();
    const date = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const time = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');

    sheet.appendRow([
      date,
      time,
      data.name || '',
      data.brand || '',
      data.phone || '',
      data.category || '',
      data.website || '',
      data.budget || '',
      data.challenge || '',
      e?.headers?.['User-Agent'] || '',
      e?.headers?.['Referer'] || '',
    ]);

    // 📧 ابعت إيميل تنبيه
    try {
      const subject = `🔥 Lead جديد من ${BRAND_NAME} — ${data.name || 'بدون اسم'}`;
      const body = `
Lead جديد وصل من الـ Landing Page!

━━━━━━━━━━━━━━━━━━━━━━━━
👤 الاسم:        ${data.name || '—'}
🏷️ البراند:      ${data.brand || '—'}
📱 الواتساب:     ${data.phone || '—'}
🎯 المجال:       ${data.category || '—'}
🌐 الموقع:       ${data.website || '—'}
💰 الميزانية:    ${data.budget || '—'}
━━━━━━━━━━━━━━━━━━━━━━━━

💬 التحدي:
${data.challenge || '—'}

━━━━━━━━━━━━━━━━━━━━━━━━
⏰ التاريخ: ${date} — ${time}
🌐 الشيت: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
      `.trim();

      MailApp.sendEmail(EMAIL_TO, subject, body);
    } catch (mailErr) {
      console.error('Email error:', mailErr);
      // متفشلش الطلب كله لو الإيميل فيه مشكلة
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('doPost error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * doGet — لو حد فتح الرابط في المتصفح
 */
function doGet(e) {
  return ContentService
    .createTextOutput('✅ FlashWin Webhook is alive. POST a JSON body to this URL.')
    .setMimeType(ContentService.MimeType.TEXT);
}


/**
 * setupSheet() — شغّلها مرة واحدة عشان تتأكد إن الـ headers متحطتش غلط
 * (مش ضرورية، doPost بيعملها لوحده)
 */
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'التاريخ', 'الوقت', 'الاسم', 'البراند', 'الواتساب',
      'المجال', 'الموقع الحالي', 'الميزانية', 'التحدي', 'User Agent', 'Referrer'
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 11);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#9c7a39');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 11);
  }
}
