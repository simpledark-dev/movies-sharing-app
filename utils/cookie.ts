export const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export const eraseCookie = (name: string) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};
