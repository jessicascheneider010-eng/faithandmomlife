const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PDF_URL = 'https://faithandmomlife.vercel.app/prayer-planner.pdf';

async function sendEmail(emailData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(emailData);
    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(body));
        else reject(new Error(`${res.statusCode}: ${body}`));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function scheduleEmail(emailData, delaySeconds) {
  return new Promise((resolve, reject) => {
    const scheduled = new Date(Date.now() + delaySeconds * 1000).toISOString();
    const data = JSON.stringify({ ...emailData, scheduled_at: scheduled });
    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(body));
        else reject(new Error(`${res.statusCode}: ${body}`));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    await sendEmail({
      from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
      to: cleanEmail,
      subject: '🙏 Your Free 7-Day Prayer Planner is Here!',
      html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#faf6f0;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#fffdf9;border:1px solid #d9c9b4;border-radius:8px;overflow:hidden;max-width:560px;width:100%;"><tr><td style="background:#f0e8dc;padding:40px 48px 32px;text-align:center;border-bottom:1px solid #d9c9b4;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4826a;">Faith & Mom Life</p><h1 style="margin:0;font-size:28px;font-weight:400;color:#3d2b1a;line-height:1.3;">Your Free Prayer Planner<br><em style="color:#c4826a;">is ready for you</em> 🙏</h1></td></tr><tr><td style="padding:40px 48px;"><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Hi mama,</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">I'm so glad you're here. You just took a beautiful step toward covering your children in intentional prayer.</p><p style="margin:0 0 28px;font-size:15px;color:#7a6050;line-height:1.8;">Your <strong style="color:#3d2b1a;">7-Day Prayer Planner</strong> is ready — click below to download:</p><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding-bottom:28px;"><a href="${PDF_URL}" style="display:inline-block;background:#3d2b1a;color:#faf6f0;text-decoration:none;padding:16px 40px;border-radius:6px;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Download My Prayer Planner ✦</a></td></tr></table><p style="margin:0;font-size:14px;color:#7a6050;line-height:1.8;">With love,<br><em style="font-size:18px;color:#3d2b1a;">Jessica</em><br><span style="font-size:12px;color:#a08060;">@FaithAndMomLife</span></p></td></tr></table></td></tr></table></body></html>`
    });

    await scheduleEmail({
      from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
      to: cleanEmail,
      subject: '💛 How are the prayers going, mama?',
      html: `<p style="font-family:Georgia,serif;color:#7a6050;">Hi mama, you're on day 3! Keep going. God hears every word. 🤍</p><p>With love,<br><em>Jessica</em></p>`
    }, 3 * 24 * 60 * 60);

    await scheduleEmail({
      from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
      to: cleanEmail,
      subject: "📖 A little something for your children's bedtime ✨",
      html: `<p style="font-family:Georgia,serif;color:#7a6050;">Hi mama, check out my <a href="https://faithandmomlife.gumroad.com/l/goodnightbiblecards">Good Night Bible Cards for Kids</a> — only $5! 🌙</p><p>With love,<br><em>Jessica</em></p>`
    }, 5 * 24 * 60 * 60);

    await scheduleEmail({
      from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
      to: cleanEmail,
      subject: "✝️ Does your child know God's Big Story?",
      html: `<p style="font-family:Georgia,serif;color:#7a6050;">Hi mama, check out my <a href="https://faithandmomlife.gumroad.com/l/aiawv">God's Big Story for Little Hearts</a> devotional — only $7! ✝️</p><p>With love,<br><em>Jessica</em></p>`
    }, 7 * 24 * 60 * 60);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
