import { Response } from 'superagent';
import { CookieJar, CookieAccessInfo } from 'cookiejar';

export const getCookieFromResponse = (response: Response) => {

  const [info, cookieJar] = [
    new CookieAccessInfo(undefined),
    new CookieJar()
  ];
  cookieJar.setCookies(response.get('Set-Cookie'));
  return cookieJar.getCookies(info).toValueString();
}
