import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { database, storage } from "../utils/firebase";
import { Book, Episode, Comment } from "./DeclareType";
import FatchProfiles from "./FetchProfiles";
import { deleteObject, ref } from "firebase/storage";

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

    public async deleteBook(bookId: string) {
        try {
          const booksCollection = collection(database, 'books');
          const bookRef = doc(booksCollection, bookId);
    
          const bookDoc = await getDoc(bookRef);
          const bookData = bookDoc.data() as Book;
    
          if (bookData.thumbnail) {
            const thumbnailRef = ref(storage, bookData.thumbnail);
            await deleteObject(thumbnailRef);
          }
    
          const epsCollection = collection(database, 'books', bookId, 'ep');
          const epsQuerySnapshot = await getDocs(epsCollection);
    
          await Promise.all(
            epsQuerySnapshot.docs.map(async (doc) => {
              const epData = doc.data() as Episode;
              if (epData.url) {
                const epUrlRef = ref(storage, epData.url);
                await deleteObject(epUrlRef);
              }
            })
          );
    
          await deleteDoc(bookRef);
    
          sessionStorage.removeItem('booksData');
          sessionStorage.removeItem(`Bookdata${bookData.owner}`);
    
          console.log('Book deleted successfully!');
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      }

      public async getComments(Id: string) {
        try {
            const Ref = doc(database, 'books', Id);
            const CollectionRef = collection(Ref, 'comments');
            const querySnapshot = await getDocs(CollectionRef);

            const comments: Comment[] = [];

            await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const commentData = doc.data();
                    const Profiles = new FatchProfiles();
                    const userProfile = await Profiles.fetchProfile(commentData.uid);
                    if (userProfile) {
                        comments.push({
                            id: doc.id,
                            uid: commentData.uid,
                            profile: userProfile,
                            text: commentData.text,
                            timestamp: commentData.timestamp,
                        });
                    }
                })
            );
            comments.sort((a: Comment, b: Comment) => {
                const aTimestamp = a.timestamp?.seconds ?? 0;
                const bTimestamp = b.timestamp?.seconds ?? 0;
                return bTimestamp - aTimestamp;
            });
            return comments;
        } catch (error) {
            console.error('Error getting comments: ', error);
            return [];
        }
    }


    
    public async deleteComment(Id: string, commentId: string) {
      try {
          const postCollection = doc(database, 'books', Id, 'comments', commentId);
          await deleteDoc(postCollection);
          console.log('Comment deleted successfully!');

      } catch (error) {
          console.error('Error deleting Comment:', error);
      }
  }

}