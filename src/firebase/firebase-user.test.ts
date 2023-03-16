import { getDownloadURL } from "firebase/storage";
import { newImage } from "./firebase-user";

jest.mock("firebase/storage");

describe("Given the firebase function", () => {
  describe("when there is NO FILE param", () => {
    test("then, the avatar should be the default image", async () => {
      const mockInfo = { id: "2", avatar: "123" };

      await newImage(mockInfo);
      expect(mockInfo.avatar).toBe(
        "https://firebasestorage.googleapis.com/v0/b/add-image-9a3cd.appspot.com/o/Avatar.png?alt=media&token=912b2430-9291-4ca1-a75a-ac8b2a746d5a"
      );
    });
  });
  describe("when there is a FILE param", () => {
    test("then, the avatar should be the default image", async () => {
      const mockInfo = { id: "2", avatar: "123" };
      const mockFile = new File(["avatar"], "avatar.png", {
        type: "image/png",
      });
      await newImage(mockInfo, mockFile);
      expect(getDownloadURL).toHaveBeenCalled();
    });
  });
});
