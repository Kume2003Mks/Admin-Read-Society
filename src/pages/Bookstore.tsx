import { Suspense, useEffect, useState } from 'react';
import Books from '../function/Books';
import { Book, Comment } from '../function/DeclareType';
import Styles from '../styles/bookstore.module.css'
import Swal from 'sweetalert2';
import Comment_Box from '../components/Comment_Box';

const Bookstore = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [comments, setComment] = useState<Comment[]>([]);
    const [reloadComponent, setReloadComponent] = useState(false);


    useEffect(() => {
        async function loadBooks() {
            try {
                const book = new Books();
                const data: Book[] = await book.getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error loading books:", error);
            }
        }
        loadBooks();
    }, [reloadComponent]);

    const handleRowClick = (book: Book) => {
        setSelectedBook(book);
        const getComment = async (id: string) => {
            try {
                const book = new Books();
                const data: Comment[] = await book.getComments(id);
                setComment(data);
            } catch (error) {
                console.error("Error loading books:", error);
            }
        }
        getComment(book.id);
    };

    const formattedDate = selectedBook?.created
        ? new Date(selectedBook?.created.seconds * 1000 + selectedBook?.created.nanoseconds / 1000000)
        : null;

    const formatDate = (date: Date | null) => {
        if (!date) return 'No date';

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    const formattedDateString = formatDate(formattedDate);

    const onDelete = async (uid: string) => {
        Swal.fire({
            title: 'Delete Book',
            text: 'Are you sure you want to delete this Book?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const Instance = new Books();
                    await Instance.deleteBook(uid);
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
                        const book = new Books();
                        if (selectedBook && selectedBook.id) {
                            await book.deleteComment(selectedBook.id, id);
                        }
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
                <Suspense fallback={<div>Loading...</div>}>
                    <div className={Styles.table_container}>
                        <table className={Styles.main_table}>
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Genre</th>
                                    <th>Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book: Book, index: number) => (
                                    <tr key={index} className={Styles.select} onClick={() => handleRowClick(book)}>
                                        <td><img src={book.thumbnail} alt={book.title} className={Styles.cover} /></td>
                                        <td>{book.title}</td>
                                        <td className={Styles.center}>{book.type}</td>
                                        <td className={Styles.center}>{book.genre}</td>
                                        <td className={Styles.center}>{book.profile?.userName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Suspense>
            </div>

            <div className={Styles.preview_container}>
                {selectedBook && (
                    <>
                        <div className={Styles.view}>
                            <h2>{selectedBook.title}</h2>
                            <div className={Styles.type_book}>
                                <img src={selectedBook.thumbnail} alt={selectedBook.title} className={Styles.cover_preview} />
                                <div className={Styles.type_text}>
                                    <h4>Owner: {selectedBook.profile?.userName}</h4>
                                    <p>Type: {selectedBook.type}</p>
                                    <p>Genre: {selectedBook.genre}</p>
                                    <p>Genre 2: {selectedBook.genre2}</p>
                                    <p>Upload: {formattedDateString}</p>
                                </div>
                            </div>

                            <div className={Styles.type_text}>
                                <h4>Description</h4>
                                <div className={Styles.desc}>
                                    <p>{selectedBook.description}</p>
                                </div>
                            </div>
                            <div className={Styles.type_text}>
                                <h4>Comment</h4>
                                <div className={Styles.desc}>
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
                            </div>

                        </div>
                        <button className={Styles.remove} onClick={() => onDelete(selectedBook.id)}>Delete</button>
                    </>
                )}
            </div>
        </main>
    )
}

export default Bookstore