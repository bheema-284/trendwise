// controllers/articleController.js (Fully ES Module Compliant)
import Article from '../models/Article.js'; // Ensure Article.js uses `export default`
import slugify from 'slugify';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET /api/articles
// FIX: Change `exports.getAllArticles` to `export const getAllArticles`
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/article/:slug
// FIX: Change `exports.getSingleArticle` to `export const getSingleArticle`
export const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/article
// FIX: Change `exports.createArticle` to `export const createArticle`



// Generate a short description from content
function generateDescription(content) {
  const plain = content.replace(/<[^>]+>/g, '').trim();
  return plain.length > 150 ? plain.slice(0, 147) + '...' : plain;
}

// Generate dummy keywords from title
function generateKeywords(title) {
  return title
    .split(' ')
    .map(word => word.replace(/[^\w]/g, '').toLowerCase())
    .filter(Boolean)
    .join(', ');
}

// OG description similar to meta desc
function generateOgDescription(content) {
  return generateDescription(content);
}

// Random HEX color for image background
function getRandomColor() {
  const colors = ['FF0000', '00AEEF', '8E44AD', '2ECC71', 'F39C12', '34495E'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const createArticle = async (req, res) => {
  try {
    const { title, slug } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newSlug = slug?.trim() || slugify(title, { lower: true, strict: true });

    const existingArticle = await Article.findOne({ slug: newSlug });
    if (existingArticle) {
      return res.status(409).json({ message: 'Article with this slug already exists.' });
    }

    // Generate dummy content
    const dummyContent = `<p>This article discusses <strong>${title}</strong> in detail, exploring the topic from multiple perspectives and offering unique insights.</p>`;

    const plainText = dummyContent.replace(/<[^>]+>/g, '').slice(0, 200).trim();
    const keywordArray = title
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.replace(/[^\w]/g, ''))
      .filter(Boolean);

    const article = new Article({
      title,
      slug: newSlug,
      content: `<h1>${title}</h1>${dummyContent}`,
      meta: {
        description: plainText,
        keywords: keywordArray.join(', '),
        ogTitle: title,
        ogImage: `https://placehold.co/600x400/000000/FFFFFF?text=${encodeURIComponent(title.split(' ')[0])}`,
        ogDescription: plainText
      },
      media: [
        {
          type: 'image',
          url: `https://placehold.co/800x450/${getRandomColor()}/FFFFFF?text=${encodeURIComponent(title.split(' ')[0])}`
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
      ],
      likes: Math.floor(Math.random() * 100),
      commentsCount: Math.floor(Math.random() * 10),
      createdAt: new Date('2024-07-25T10:00:00.000Z'),
      updatedAt: new Date(),
      author: null
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/generate (Admin only)
// FIX: Change `exports.generateArticle` to `export const generateArticle`
export const generateArticle = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required for article generation.' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if you have access
      messages: [{ role: "user", content: `Generate a blog article based on the following prompt: ${prompt}. Provide a catchy title and well-structured content.` }],
      max_tokens: 1000, // Adjust as needed
    });

    const generatedText = chatCompletion.choices[0].message.content;

    // Basic parsing of title and content from generated text
    const lines = generatedText.split('\n');
    let generatedTitle = 'Generated Article';
    let generatedContent = generatedText;

    if (lines[0].startsWith('Title:')) {
      generatedTitle = lines[0].replace('Title:', '').trim();
      generatedContent = lines.slice(1).join('\n').trim();
    } else if (lines[0].startsWith('# ')) { // Markdown H1
      generatedTitle = lines[0].replace('# ', '').trim();
      generatedContent = lines.slice(1).join('\n').trim();
    }

    const newSlug = slugify(generatedTitle, { lower: true, strict: true });

    // Save the generated article to the database
    const article = new Article({
      title: generatedTitle,
      content: generatedContent,
      slug: newSlug,
      author: req.user._id // Admin who triggered the generation
    });
    const savedArticle = await article.save();

    res.status(201).json({ message: 'Article generated and saved successfully', article: savedArticle });
  } catch (err) {
    console.error('Error generating article:', err.response ? err.response.data : err.message);
    res.status(500).json({ message: 'Failed to generate article from ChatGPT', error: err.message });
  }
};