import codeGenerator from '@/app/middleware/codeGenerator.js';

export default function Home() {
  const { state, codeChallenge, codeVerifier } = codeGenerator();
  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI!,
    scope: 'email_r listings_r transactions_r',
    client_id: process.env.ETSY_API_KEY!,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  return <a 
  href={`https://www.etsy.com/oauth/connect?${params}`}>
    Authenticate with Etsy
  </a>;
}