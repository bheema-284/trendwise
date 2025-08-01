import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateArticle = async (topic) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: `Write a detailed SEO-optimized blog post on: ${topic}` },
    ],
  });

  return response.data.choices[0].message.content;
};