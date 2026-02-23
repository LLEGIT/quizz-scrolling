import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount') || '1';
    const difficulty = searchParams.get('difficulty') || 'medium';
    const token = searchParams.get('token');

    let url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    
    if (token) {
      url += `&token=${token}`;
    }

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      console.error('OpenTDB API returned non-ok status:', response.status);
      return NextResponse.json(
        { error: 'Failed to fetch questions' },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Handle OpenTDB API response codes
    if (data.response_code === 4) {
      return NextResponse.json(
        { error: 'Token has returned all possible questions. Please reset the token or start a new session.' },
        { status: 400 }
      );
    }

    if (data.response_code !== 0) {
      console.error('OpenTDB API error code:', data.response_code);
      return NextResponse.json(
        { error: 'Failed to fetch questions', code: data.response_code },
        { status: 400 }
      );
    }
    
    // Ensure results exist
    if (!data.results || !Array.isArray(data.results)) {
      console.error('No results in OpenTDB API response');
      return NextResponse.json(
        { error: 'No questions returned from API' },
        { status: 400 }
      );
    }

    // Transform the data to a more usable format
    const questions = data.results.map(q => ({
      id: Math.random().toString(36).substr(2, 9),
      question: decodeHTML(q.question),
      type: 'multiple',
      difficulty: q.difficulty,
      correctAnswer: decodeHTML(q.correct_answer),
      incorrectAnswers: q.incorrect_answers.map(decodeHTML),
      allAnswers: shuffleArray([
        decodeHTML(q.correct_answer),
        ...q.incorrect_answers.map(decodeHTML)
      ])
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

function decodeHTML(html) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&rsquo;': "'",
    '&nbsp;': ' ',
  };
  let decoded = html;
  Object.entries(entities).forEach(([entity, char]) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  });
  return decoded;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
