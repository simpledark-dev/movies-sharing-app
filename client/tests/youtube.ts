import { expect } from "chai";
import { getYoutubeIdFromURL } from "@/utils/youtube";

describe("getYoutubeIdFromURL", () => {
  it("returns the YouTube ID when given a valid URL", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const expected = "dQw4w9WgXcQ";
    const result = getYoutubeIdFromURL(url);
    expect(result).to.equal(expected);
  });

  it("returns an empty string when given an invalid URL", () => {
    const url = "https://example.com";
    const expected = "";
    const result = getYoutubeIdFromURL(url);
    expect(result).to.equal(expected);
  });
});
