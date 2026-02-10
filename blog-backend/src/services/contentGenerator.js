/**
 * Otomatik Blog İçerik Üretici
 * - OpenAI API varsa kullanır (gerçek araştırma benzeri içerik)
 * - Yoksa SEO uyumlu şablon tabanlı içerik üretir
 */
import OpenAI from 'openai';
import slugify from 'slugify';
import { config } from '../config/index.js';

// Minimum 800, hedef 1000-1200 kelime
const TARGET_WORD_COUNT = { min: 800, max: 1200 };

/**
 * OpenAI ile içerik üret (API key varsa)
 */
async function generateWithOpenAI(title, categoryName) {
  if (!config.openaiApiKey) return null;

  const openai = new OpenAI({ apiKey: config.openaiApiKey });

  const prompt = `Sen bir SEO uzmanı ve blog yazarısın. Aşağıdaki başlık için Türkçe, özgün, internette araştırılmış gibi derinlemesine bir blog yazısı yaz.

KURALLAR:
- Başlık: "${title}"
- Kategori: ${categoryName}
- Dil: Türkçe
- Kelime sayısı: ${TARGET_WORD_COUNT.min}-${TARGET_WORD_COUNT.max} kelime arası
- H1 başlık zaten verildi, sen H2 ve H3 alt başlıklar kullan
- Özgün ol, kopyala-yapıştır yapma
- SEO uyumlu: anahtar kelimeleri doğal kullan
- Paragraflar 2-4 cümle arası olsun
- Meta title (max 60 karakter) ve meta description (max 155 karakter) üret

Çıktıyı SADECE aşağıdaki JSON formatında ver, başka metin ekleme:
{
  "content": "HTML formatında içerik (h2, h3, p, ul, li etiketleriyle)",
  "excerpt": "2-3 cümlelik özet (max 160 karakter)",
  "meta_title": "...",
  "meta_description": "..."
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const text = response.choices[0]?.message?.content?.trim() || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    console.error('OpenAI content generation error:', err.message);
  }
  return null;
}

/**
 * Şablon tabanlı içerik üret (OpenAI yoksa)
 * SEO uyumlu, yapılandırılmış HTML
 */
function generateWithTemplate(title, categoryName) {
  const slug = slugify(title, { lower: true, strict: true, locale: 'tr' });

  // Anahtar kelimelerden türetilen alt başlıklar
  const sections = [
    { h2: `${title} Nedir?`, paragraphs: 2 },
    { h2: `${title} Hakkında Temel Bilgiler`, h3: ['Önemli Noktalar', 'Dikkat Edilmesi Gerekenler'], paragraphs: 2 },
    { h2: `${title} ile İlgili Pratik Öneriler`, paragraphs: 2 },
    { h2: 'Sonuç ve Değerlendirme', paragraphs: 2 },
  ];

  let content = '';
  const loremParts = [
    'Modern yaşam alanlarında kalite ve estetik ön planda tutulmalıdır. Kaizen Art felsefesiyle sürdürülebilir tasarımlar hayata geçirilmektedir. ',
    'İnşaat ve mimari projelerde detaylara verilen önem, sonuçların başarısını doğrudan etkilemektedir. Profesyonel yaklaşım ve mühendislik hassasiyeti gereklidir. ',
    'Antalya bölgesinde doğayla uyumlu, çağdaş yapılar inşa etmek için deneyimli ekiplerle çalışmak önemlidir. Özgün tasarımlar değer yaratır. ',
    'Tasarım süreçlerinde fonksiyonellik ve estetik birlikte düşünülmelidir. Kullanıcı ihtiyaçları merkeze alınarak planlama yapılmalıdır. ',
    'Sürdürülebilirlik, enerji verimliliği ve çevre dostu malzeme seçimleri günümüzde vazgeçilmez kriterler arasındadır. ',
  ];

  let wordCount = 0;
  const targetWords = TARGET_WORD_COUNT.min + Math.floor(Math.random() * (TARGET_WORD_COUNT.max - TARGET_WORD_COUNT.min));

  for (const section of sections) {
    content += `<h2>${escapeHtml(section.h2)}</h2>`;

    if (section.h3) {
      for (const h3 of section.h3) {
        content += `<h3>${escapeHtml(h3)}</h3>`;
        const pCount = 2;
        for (let i = 0; i < pCount; i++) {
          const para = generateParagraph(title, categoryName, loremParts);
          content += `<p>${para}</p>`;
          wordCount += para.split(/\s+/).length;
        }
      }
    }

    for (let i = 0; i < section.paragraphs; i++) {
      const para = generateParagraph(title, categoryName, loremParts);
      content += `<p>${para}</p>`;
      wordCount += para.split(/\s+/).length;
    }
  }

  // Kelime sayısı yetersizse ek paragraflar
  while (wordCount < TARGET_WORD_COUNT.min) {
    content += `<h2>${escapeHtml(title)} Hakkında Ek Bilgiler</h2>`;
    for (let i = 0; i < 2; i++) {
      const para = generateParagraph(title, categoryName, loremParts);
      content += `<p>${para}</p>`;
      wordCount += para.split(/\s+/).length;
    }
  }

  const metaTitle = `${title} | Kaizen Art Blog`;
  const metaDesc = `${title} hakkında detaylı bilgiler, pratik öneriler ve Kaizen Art uzmanlığıyla hazırlanmış rehber. ${categoryName} kategorisinde.`;

  return {
    content,
    excerpt: `${title} konusunda kapsamlı bir rehber. Kaizen Art İnşaat & Mühendislik uzmanlarından ${categoryName} alanında güncel bilgiler ve öneriler.`,
    meta_title: metaTitle.slice(0, 60),
    meta_description: metaDesc.slice(0, 155),
  };
}

function generateParagraph(title, category, parts) {
  const sentences = [
    `${title} konusu, ${category} alanında önemli bir yer tutmaktadır.`,
    ...parts,
    `Kaizen Art olarak ${title} ile ilgili projelerimizde kalite ve müşteri memnuniyetini ön planda tutuyoruz.`,
    `${category} sektöründe deneyimimizle ${title} hakkında en güncel yaklaşımları sunuyoruz.`,
  ];
  const selected = [...sentences].sort(() => Math.random() - 0.5).slice(0, 4);
  return selected.join(' ');
}

function escapeHtml(str) {
  if (!str) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}

/**
 * Ana fonksiyon: Başlık ve kategoriye göre içerik üret
 */
export async function generateBlogContent(title, categoryName) {
  // Önce OpenAI dene
  const aiResult = await generateWithOpenAI(title, categoryName);
  if (aiResult && aiResult.content) {
    return {
      ...aiResult,
      slug: slugify(title, { lower: true, strict: true, locale: 'tr' }),
    };
  }

  // Yoksa şablon tabanlı
  const result = generateWithTemplate(title, categoryName);
  return {
    ...result,
    slug: slugify(title, { lower: true, strict: true, locale: 'tr' }),
  };
}

export { slugify };
