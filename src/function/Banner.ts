import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { database, storage } from "../utils/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type banner = {
    id: string;
    banner: string;
}

export default class Banners {
    public async getBanner() {
        try {
            const bannerCollection = collection(database, 'banner');
            const querySnapshot = await getDocs(bannerCollection);

            const allBanner: banner[] = [];
            for (const docs of querySnapshot.docs) {
                const bannerData: banner = docs.data() as banner;
                const bookId = docs.id;
                bannerData.id = bookId;
                allBanner.push(bannerData);
            }
            console.log(allBanner);
            return allBanner;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    public async deleteBanner(bannerId: string) {
        try {
          const bannerDocRef = doc(collection(database, 'banner'), bannerId);
          const Doc = await getDoc(bannerDocRef);
          await deleteDoc(bannerDocRef);
          console.log(`Banner with ID ${bannerId} deleted successfully from the database.`);
          const Docdata = Doc.data() as banner;
          if (Docdata.banner) {
            const contentRef = ref(storage, Docdata.banner);
            await deleteObject(contentRef);
          }
        } catch (error) {
          console.error("Error deleting banner from the database:", error);
          throw error;
        }
      }

      public async uploadBanner(file: File): Promise<string> {
        try {
          const storageRef = ref(storage, `banners/${file.name + Math.floor(Math.random() * 256)}}`);
          await uploadBytes(storageRef, file);
    
          const downloadURL = await getDownloadURL(storageRef);
    
          const bannerCollection = collection(database, 'banner');
          const newBannerRef = await addDoc(bannerCollection, { banner: downloadURL });

          return newBannerRef.id;
        } catch (error) {
          console.error("Error uploading banner:", error);
          throw error;
        }
      }

}