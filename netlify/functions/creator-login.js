export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }
  try {
    const { code } = JSON.parse(event.body || '{}');
    const expected = process.env.CREATOR_PASSWORD;
    if (!expected) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server not configured' }) };
    }
    if (code === expected) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'Incorrect passcode' }) };
  } catch {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Bad request' }) };
  }
};