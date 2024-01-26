import { collection, getDocs, doc } from "firebase/firestore";
import { database } from "../utils/firebase";
import { Book } from "./DeclareType";
import FatchProfiles from "./FetchProfiles";

// interface BookData {
//     title: string;
//     genre: string;
//     genre2: string;
//     type: string;
//     description: string;
//     tags: string[];
//     modified: Date;
//     thumbnail?: string;
// }

// interface EpData {
//     title: string;
//     url?: string;
// }

export default class Books {

    private async getAllLikes(bookId: string) {
        try {
            const likesCollectionRef = collection(doc(database, 'books', bookId), 'likes');
            const likesSnapshot = await getDocs(likesCollectionRef);

            const allLikes = likesSnapshot.docs.map(doc => ({
                userId: doc.id,
                liked: doc.data().liked,
            }));

            return allLikes.length;
        } catch (error) {
            console.error('Error getting all likes:', error);
            throw error;
        }
    }

    public async getBooks() {
        try {
            const storedBooks = sessionStorage.getItem('booksData');
            if (storedBooks) {
              const parsedBooks = JSON.parse(storedBooks);
              console.log(parsedBooks);
              return parsedBooks;
            }

            const booksCollection = collection(database, 'books');
            const querySnapshot = await getDocs(booksCollection);

            const allBooks: Book[] = [];
            for (const docs of querySnapshot.docs) {
                const bookData: Book = docs.data() as Book;
                const bookId = docs.id;
                bookData.id = bookId;
                const Profiles = new FatchProfiles()
                const ownerProfile = await Profiles.fetchProfile(bookData.owner);
                if (ownerProfile) {
                    bookData.profile = ownerProfile;
                }
                const countlike = await this.getAllLikes(bookData.id);
                bookData.like = countlike;

                allBooks.push(bookData);
            }
            sessionStorage.setItem('booksData', JSON.stringify(allBooks));
            console.log(allBooks);
            return allBooks;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

}