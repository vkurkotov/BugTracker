export class Utils {
  private static authCookieName = "BugTrackerAuthCookie";

  public static getCookie = (name: string): string => {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : "";
  }

  public static isAuthenticated = (): boolean => {
    return Utils.getCookie(Utils.authCookieName) !== "";
  }
}