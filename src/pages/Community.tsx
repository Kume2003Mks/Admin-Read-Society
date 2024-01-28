import { Suspense, useEffect, useState } from 'react';
import Styles from '../styles/community.module.css'
import { Comment, Post } from '../function/DeclareType';
import Social from '../function/Social';
import Swal from 'sweetalert2';
import PostBox from '../components/PostBox';
import Comment_Box from '../components/Comment_Box';

const Community = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComment] = useState<Comment[]>([]);
    const [posts_id, setPosts_id] = useState<string>('');
    const [reloadComponent, setReloadComponent] = useState(false);

    useEffect(() => {
        async function loadBooks() {
            try {
                const book = new Social();
                const data: Post[] = await book.getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error loading books:", error);
            }
        }
        loadBooks();
    }, [reloadComponent]);

    const onDelete = async (uid: string) => {
        Swal.fire({
            title: 'Delete Post',
            text: 'Are you sure you want to delete this Post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const Instance = new Social();
                    await Instance.deletePost(uid);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    setReloadComponent((prev) => !prev);

                } catch (error) {
                    console.error("Error deleting Book:", error);
                }
            }
        });
    }

    const getComment = async (id: string) => {
        try {
            const book = new Social();
            const data: Comment[] = await book.getComments(id);
            setPosts_id(id)
            setComment(data);
        } catch (error) {
            console.error("Error loading books:", error);
        }
    }

    const delComment = async (id: string) => {
        try {
            Swal.fire({
                title: 'Delete Post',
                text: 'Are you sure you want to delete this Post?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const book = new Social();
                        await book.deleteComment(posts_id, id);
                        setPosts_id(id)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        setReloadComponent((prev) => !prev);
                    } catch (error) {
                        console.error("Error deleting Book:", error);
                    }
                }
            });
        } catch (error) {
            console.error("Error loading books:", error);
        }
    }

    return (
        <main className='container'>
            <div className={Styles.list_container}>
                <div className={Styles.max}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {posts?.map((props: Post, index: number) => (
                            <PostBox
                                key={index}
                                {...props}
                                isSpoil={props?.spoil}
                                username={props.profile?.userName}
                                userprofile={props.profile?.profile_image}
                                onDelete={() => onDelete(props.id)}
                                onComment={() => getComment(props.id)}
                            />
                        ))}
                    </Suspense>
                </div>

            </div>

            <div className={Styles.preview_container}>
                {comments?.map((props: Comment, index: number) => (
                    <Comment_Box key={index}
                        text={props?.text}
                        image={props.profile?.profile_image}
                        user_name={props.profile?.userName}
                        uid={props.uid}
                        timestamp={props?.timestamp}
                        onDelete={() => delComment(props.id!)}
                    />
                ))}
            </div>
        </main>
    )
}

export default Community