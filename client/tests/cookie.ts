import { eraseCookie, getCookieValue } from "@/utils/cookie";

describe("getCookieValue", () => {
  beforeEach(() => {
    document.cookie = "testCookie=value";
  });

  afterEach(() => {
    document.cookie = "testCookie=; Max-Age=-99999999;";
  });

  it("should return the value of the specified cookie", () => {
    expect(getCookieValue("testCookie")).toEqual("value");
  });

  it("should return an empty string if the specified cookie does not exist", () => {
    expect(getCookieValue("nonExistentCookie")).toEqual("");
  });
});

describe("eraseCookie", () => {
  beforeEach(() => {
    document.cookie = "testCookie=value";
  });

  afterEach(() => {
    document.cookie = "testCookie=; Max-Age=-99999999;";
  });

  it("should erase the specified cookie", () => {
    eraseCookie("testCookie");
    expect(document.cookie).toEqual("");
  });
});
