// @ts-nocheck
import express from 'express';
import cors from 'cors';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const PORT = process.env.PORT || 3000;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main analyze endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { fighter1, fighter2, context, mode } = req.body;

    if (!fighter1 || !fighter2) {
      return res.status(400).json({ error: 'Both fighter names are required' });
    }

    console.log(`Analyzing: ${fighter1} vs ${fighter2}`);
    console.log(`Mode: ${mode}`);

    let prompt = '';

    if (mode === 'quick') {
      prompt = `You are a UFC analyst. Give a quick prediction for this fight:

${fighter1} vs ${fighter2}
${context ? `Context: ${context}` : ''}

Respond with:
1. Your pick to win (just the name)
2. How they win (KO/TKO, Submission, or Decision)
3. Round (if finish) or "Goes to decision"
4. Confidence level (Low/Medium/High)
5. One sentence explanation

Keep it brief and punchy.`;
    } else if (mode === 'betting') {
      prompt = `You are a sharp UFC betting analyst. Analyze this matchup from a betting perspective:

${fighter1} vs ${fighter2}
${context ? `Context: ${context}` : ''}

Cover:
1. Who the public will likely favor and why
2. Where the value might be (underdog potential, prop bets)
3. Key factors that could swing the odds
4. Your lean and why
5. Any prop bets worth considering (method of victory, over/under rounds)

Be direct and analytical. This is for entertainment purposes only.`;
    } else {
      // Full breakdown
      prompt = `You are an expert UFC analyst. Provide a detailed breakdown of this matchup:

${fighter1} vs ${fighter2}
${context ? `Context: ${context}` : ''}

Cover these areas:

**TALE OF THE TAPE**
Brief background on both fighters, their records, and where they are in their careers.

**STYLE MATCHUP**
How their fighting styles match up. Striker vs grappler? Pressure vs counter? Etc.

**${fighter1.toUpperCase()} - PATH TO VICTORY**
How this fighter wins. Their key strengths and what they need to do.

**${fighter2.toUpperCase()} - PATH TO VICTORY**
How this fighter wins. Their key strengths and what they need to do.

**X-FACTORS**
Key variables that could decide the fight (cardio, chin, cage rust, weight cut, etc.)

**PREDICTION**
Your pick, how they win, and what round (or decision). Explain your reasoning.

Be detailed but engaging. Write like you're breaking it down for a hardcore UFC fan.`;
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    res.json({
      analysis: responseText,
      fighter1,
      fighter2,
      mode
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze fight',
      message: error.message 
    });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🥊 UFC Analyzer running at http://localhost:${PORT}`);
});
