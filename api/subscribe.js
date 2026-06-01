const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PDF_URL = 'https://faithandmomlife.vercel.app/prayer-planner.pdf';

function sendRequest(data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(body));
        else reject(new Error(res.statusCode + ': ' + body));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function emailWelcome(email) {
  return JSON.stringify({
    from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
    to: email,
    subject: '🙏 Your Free 7-Day Prayer Planner is Here!',
    html: '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#faf6f0;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#fffdf9;border:1px solid #d9c9b4;border-radius:8px;overflow:hidden;max-width:560px;width:100%;"><tr><td style="background:#f0e8dc;padding:40px 48px 32px;text-align:center;border-bottom:1px solid #d9c9b4;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4826a;">Faith & Mom Life</p><h1 style="margin:0;font-size:28px;font-weight:400;color:#3d2b1a;line-height:1.3;">Your Free Prayer Planner<br><em style="color:#c4826a;">is ready for you</em> 🙏</h1></td></tr><tr><td style="padding:40px 48px;"><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Hi mama,</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">I am so glad you are here. You just took a beautiful step toward covering your children in intentional prayer.</p><p style="margin:0 0 28px;font-size:15px;color:#7a6050;line-height:1.8;">Your <strong style="color:#3d2b1a;">7-Day Prayer Planner</strong> is ready — click below to download:</p><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding-bottom:28px;"><a href="' + PDF_URL + '" style="display:inline-block;background:#3d2b1a;color:#faf6f0;text-decoration:none;padding:16px 40px;border-radius:6px;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Download My Prayer Planner</a></td></tr></table><p style="margin:0 0 8px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c4826a;">How to use it</p><ul style="margin:0 0 24px;padding-left:20px;"><li style="font-size:14px;color:#7a6050;line-height:1.8;margin-bottom:4px;">Set aside 5-10 minutes each day</li><li style="font-size:14px;color:#7a6050;line-height:1.8;margin-bottom:4px;">Read the Bible verse for the day</li><li style="font-size:14px;color:#7a6050;line-height:1.8;margin-bottom:4px;">Pray through it in your own words</li><li style="font-size:14px;color:#7a6050;line-height:1.8;">Reflect and write in the notes section</li></ul><p style="margin:0 0 16px;font-size:14px;color:#c4826a;line-height:1.8;font-style:italic;">Consistency matters more than perfection, mama.</p><p style="margin:0;font-size:14px;color:#7a6050;line-height:1.8;">With love,<br><em style="font-size:18px;color:#3d2b1a;">Jessica</em><br><span style="font-size:12px;color:#a08060;">@FaithAndMomLife</span></p></td></tr><tr><td style="background:#f0e8dc;padding:20px 48px;text-align:center;border-top:1px solid #d9c9b4;"><p style="margin:0;font-size:11px;color:#c4b09a;">Faith & Mom Life · faithandmomlife.com</p></td></tr></table></td></tr></table></body></html>'
  });
}

function emailDay3(email) {
  return JSON.stringify({
    from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
    to: email,
    subject: '💛 How are the prayers going, mama?',
    scheduled_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    html: '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#faf6f0;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#fffdf9;border:1px solid #d9c9b4;border-radius:8px;overflow:hidden;max-width:560px;width:100%;"><tr><td style="background:#f0e8dc;padding:40px 48px 32px;text-align:center;border-bottom:1px solid #d9c9b4;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4826a;">Faith & Mom Life</p><h1 style="margin:0;font-size:26px;font-weight:400;color:#3d2b1a;line-height:1.3;">You are on Day 3, mama 🙏</h1></td></tr><tr><td style="padding:40px 48px;"><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Hi again,</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">You are halfway through the prayer planner. I just wanted to check in on you.</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Praying for our children is not always easy. Some days we feel spiritually dry. Some days we are just exhausted.</p><p style="margin:0 0 16px;font-size:15px;color:#c4826a;line-height:1.8;font-style:italic;">Your prayers matter, even when you do not feel them.</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Keep going. God hears every word. 🤍</p><p style="margin:0;font-size:14px;color:#7a6050;line-height:1.8;">With love,<br><em style="font-size:18px;color:#3d2b1a;">Jessica</em></p></td></tr><tr><td style="background:#f0e8dc;padding:20px 48px;text-align:center;border-top:1px solid #d9c9b4;"><p style="margin:0;font-size:11px;color:#c4b09a;">Faith & Mom Life · faithandmomlife.com</p></td></tr></table></td></tr></table></body></html>'
  });
}

function emailDay5(email) {
  return JSON.stringify({
    from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
    to: email,
    subject: '📖 A little something for your children\'s bedtime ✨',
    scheduled_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    html: '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#faf6f0;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#fffdf9;border:1px solid #d9c9b4;border-radius:8px;overflow:hidden;max-width:560px;width:100%;"><tr><td style="background:#f0e8dc;padding:40px 48px 32px;text-align:center;border-bottom:1px solid #d9c9b4;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4826a;">Faith & Mom Life</p><h1 style="margin:0;font-size:26px;font-weight:400;color:#3d2b1a;line-height:1.3;">End every day with<br><em style="color:#c4826a;">God\'s Word</em> 🌙</h1></td></tr><tr><td style="padding:40px 48px;"><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Hi mama,</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">By now you have been praying intentionally for almost a week. That is beautiful.</p><p style="margin:0 0 24px;font-size:15px;color:#7a6050;line-height:1.8;">I want to share something I created to bring that same faith into your child\'s bedtime routine:</p><table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;"><tr><td style="background:#f0e8dc;border:1px solid #d9c9b4;border-radius:8px;padding:28px;text-align:center;"><p style="margin:0 0 8px;font-size:20px;font-weight:600;color:#3d2b1a;">Good Night Bible Cards for Kids</p><p style="margin:0 0 16px;font-size:14px;color:#7a6050;line-height:1.6;">Simple, printable cards with Bible verses and short prayers — perfect for bedtime.</p><p style="margin:0 0 20px;font-size:24px;font-weight:600;color:#c4826a;">Only $5</p><a href="https://faithandmomlife.gumroad.com/l/goodnightbiblecards" style="display:inline-block;background:#3d2b1a;color:#faf6f0;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Get the Bible Cards</a></td></tr></table><p style="margin:0;font-size:14px;color:#7a6050;line-height:1.8;">With love,<br><em style="font-size:18px;color:#3d2b1a;">Jessica</em></p></td></tr><tr><td style="background:#f0e8dc;padding:20px 48px;text-align:center;border-top:1px solid #d9c9b4;"><p style="margin:0;font-size:11px;color:#c4b09a;">Faith & Mom Life · faithandmomlife.com</p></td></tr></table></td></tr></table></body></html>'
  });
}

function emailDay7(email) {
  return JSON.stringify({
    from: 'Jessica — Faith & Mom Life <jessica@faithandmomlife.com>',
    to: email,
    subject: '✝️ Does your child know God\'s Big Story?',
    scheduled_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    html: '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#faf6f0;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#fffdf9;border:1px solid #d9c9b4;border-radius:8px;overflow:hidden;max-width:560px;width:100%;"><tr><td style="background:#f0e8dc;padding:40px 48px 32px;text-align:center;border-bottom:1px solid #d9c9b4;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4826a;">Faith & Mom Life</p><h1 style="margin:0;font-size:26px;font-weight:400;color:#3d2b1a;line-height:1.3;">Help them understand<br><em style="color:#c4826a;">who God is</em> ✝️</h1></td></tr><tr><td style="padding:40px 48px;"><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">Hi mama,</p><p style="margin:0 0 16px;font-size:15px;color:#7a6050;line-height:1.8;">One of the deepest desires of a Christian mom\'s heart is for her children to truly know Jesus.</p><table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;"><tr><td style="background:#f0e8dc;border:1px solid #d9c9b4;border-radius:8px;padding:28px;text-align:center;"><p style="margin:0 0 4px;font-size:20px;font-weight:600;color:#3d2b1a;">God\'s Big Story for Little Hearts</p><p style="margin:0 0 16px;font-size:13px;color:#c4826a;letter-spacing:1px;text-transform:uppercase;">8-Day Gospel Devotional · Ages 4-7</p><p style="margin:0 0 16px;font-size:14px;color:#7a6050;line-height:1.6;">Simple, short, and filled with truth your child can hold onto.</p><p style="margin:0 0 20px;font-size:24px;font-weight:600;color:#c4826a;">Only $7</p><a href="https://faithandmomlife.gumroad.com/l/aiawv" style="display:inline-block;background:#3d2b1a;color:#faf6f0;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Get the Devotional</a></td></tr></table><p style="margin:0 0 16px;font-size:15px;color:#c4826a;line-height:1.8;font-style:italic;">The greatest gift you can give your child is knowing Jesus.</p><p style="margin:0;font-size:14px;color:#7a6050;line-height:1.8;">Praying for your family,<br><em style="font-size:18px;color:#3d2b1a;">Jessica</em></p></td></tr><tr><td style="background:#f0e8dc;padding:20px 48px;text-align:center;border-top:1px solid #d9c9b4;"><p style="margin:0;font-size:11px;color:#c4b09a;">Faith & Mom Life · faithandmomlife.com</p></td></tr></table></td></tr></table></body></html>'
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email } = req.body || {};
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Please enter a valid email address.' });
  const cleanEmail = email.trim().toLowerCase();
  try {
    await sendRequest(emailWelcome(cleanEmail));
    await sendRequest(emailDay3(cleanEmail));
    await sendRequest(emailDay5(cleanEmail));
    await sendRequest(emailDay7(cleanEmail));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
