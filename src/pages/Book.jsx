import Container from '../components/Container';
import {useParams} from 'react-router-dom';
import { useState , useEffect } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Book = () => {

    const params = useParams();
    const [book, setBook] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getData = async () => {
        let url = `https://api.matgargano.com/api/books/${params.id}`;
        console.log(url)
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBook(response);
            console.log(book)
        } catch(e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (<div class='flex justify-center'>

        {!error && !loading && <>
            <table class="border rounded-lg bg-slate-400 overflow-hidden">
                <tbody>
                    <tr class=" border-b-2 text-zinc-100">
                        <td class="m-3 p-3 border-r-2">Title</td>
                        <td class="m-3 p-3 border-r-2">Author</td>
                        <td class="m-3 p-3 border-r-2">Publisher</td>
                        <td class="m-3 p-3 border-r-2">Year</td>
                        <td class="m-3 p-3 border-r-2">Pages</td>
                        <td class="m-3 p-3 border-r-2">Country</td>
                    </tr>
                    <tr>
                        <td class="m-3 p-3 border-r-2">{book.title}</td>
                        <td class="m-3 p-3 border-r-2">{book.author}</td>
                        <td class="m-3 p-3 border-r-2">{book.publisher}</td>
                        <td class="m-3 p-3 border-r-2">{book.year}</td>
                        <td class="m-3 p-3 border-r-2">{book.pages}</td>
                        <td class="m-3 p-3 border-r-2">{book.country}</td>
                    </tr>
                    
                </tbody>
            </table>
        </>}
            
    </div>)
}

export default Book;