import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const command = searchParams.get('command') || 'request';
  const token = searchParams.get('token');

  try {
    let url = `https://opentdb.com/api_token.php?command=${command}`;
    
    if (command === 'reset' && token) {
      url += `&token=${token}`;
    }

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to manage token' },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Check for API errors
    if (data.response_code !== 0) {
      return NextResponse.json(
        { error: 'OpenTDB API error', code: data.response_code },
        { status: 400 }
      );
    }

    return NextResponse.json({
      token: data.token,
      responseCode: data.response_code
    });
  } catch (error) {
    console.error('Error managing token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
