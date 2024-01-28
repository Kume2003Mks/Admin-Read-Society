import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { database, storage } from "../utils/firebase";
import { Post, Comment } from "./DeclareType";
import FatchProfiles from "./FetchProfiles";
import { deleteObject, ref } from "firebase/storage";

export default class Social {
    public async getPosts() {
        try {

            const postCollection = collection(database, 'posts');
            const querySnapshot = await getDocs(postCollection);

            const allPosts: Post[] = [];
            for (const docs of querySnapshot.docs) {
                const postData: Post = docs.data() as Post;
                const bookId = docs.id;
                postData.id = bookId;

                const Profiles = new FatchProfiles()
                const ownerProfile = await Profiles.fetchProfile(postData.uid);
                if (ownerProfile) {
                    postData.profile = ownerProfile;
                }

                allPosts.push(postData);
            }
            sessionStorage.setItem('PostsData', JSON.stringify(allPosts));
            return allPosts;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    public async deletePost(postId: string) {
        try {
            const postCollection = collection(database, 'posts');
            const postRef = doc(postCollection, postId);

            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                const post = postSnapshot.data();

                if (post?.image && post.image.length > 0) {
                    await Promise.all(
                        post.image.map(async (imageUrl: string) => {
                            const imageRef = ref(storage, imageUrl);

                            await deleteObject(imageRef);

                            console.log(`Image deleted successfully: ${imageUrl}`);
                        })
                    );
                }

                await deleteDoc(postRef);
                console.log('Book deleted successfully!');
            } else {
                console.log('Document does not exist.');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    public async getComments(PostId: string) {
        try {
            const postRef = doc(database, 'posts', PostId);
            const commentsCollectionRef = collection(postRef, 'comments');
            const querySnapshot = await getDocs(commentsCollectionRef);

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

    public async deleteComment(postId: string, commentId: string) {
        try {
            const postCollection = doc(database, 'posts', postId, 'comments', commentId);
            await deleteDoc(postCollection);
            console.log('Comment deleted successfully!');

        } catch (error) {
            console.error('Error deleting Comment:', error);
        }
    }
}