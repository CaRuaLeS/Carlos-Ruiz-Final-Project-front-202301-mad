import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UserStructure } from "../model/user";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const newImage = async (info: Partial<UserStructure>, file?: File) => {
  if (!file) {
    info.avatar =
      "https://firebasestorage.googleapis.com/v0/b/add-image-9a3cd.appspot.com/o/Avatar.png?alt=media&token=912b2430-9291-4ca1-a75a-ac8b2a746d5a";
    return;
  }
  const storagaRef = ref(storage, info.email);

  await uploadBytes(storagaRef, file);

  const imgUrl = await getDownloadURL(storagaRef);

  info.avatar = imgUrl;
};
