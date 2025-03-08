const { google } = require('googleapis');
const { oAuth2Client } = require('../config/googleAuth');
const OpenAI = require('openai'); // Import trực tiếp OpenAI

// Khởi tạo client OpenAI với API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getEmails = async (req, res) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });
    const messages = response.data.messages || [];

    const emailPromises = messages.map(async (msg) => {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
      });
      const snippet = email.data.snippet;

      // Gọi OpenAI API với cú pháp mới
      const aiResponse = await openai.completions.create({
        model: 'gpt-4', // Hoặc 'gpt-3.5-turbo' nếu không có quyền truy cập GPT-4
        prompt: `Tóm tắt email ngắn gọn và phân loại (quan trọng, spam, quảng cáo): ${snippet}`,
        max_tokens: 50,
      });

      return {
        id: msg.id,
        summary: aiResponse.choices[0].text.trim(),
      };
    });

    const emails = await Promise.all(emailPromises);
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Không thể lấy email' });
  }
};