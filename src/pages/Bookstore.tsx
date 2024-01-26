import { Suspense, useEffect, useState } from 'react';
import Books from '../function/Books';
import { Book } from '../function/DeclareType';
import Styles from '../styles/bookstore.module.css'

const Bookstore = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
    }, []);

    const handleRowClick = (book: Book) => {
        setSelectedBook(book);
    };

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
                    <div>
                        <h2>{selectedBook.title}</h2>
                        {/* Render other details of the selected book */}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Bookstore