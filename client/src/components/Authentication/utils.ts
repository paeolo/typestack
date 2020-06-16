import { Response } from 'superagent';
import { Cookie } from 'cookiejar';

export const getCookieFromResponse = (response: Response) => {

  const cookies = response.get('Set-Cookie').map(cookie => new Cookie(cookie));
  return cookies.map(cookie => cookie.toValueString()).join(';');
}
