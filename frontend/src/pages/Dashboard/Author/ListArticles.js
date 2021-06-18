import React, { useEffect, useState } from 'react';
import TableArticle from '../TableArticle';
import axios from 'axios';

function ListArticles() {
    const [articles, setArticles] = useState([]);

    // useEffect(() => {
    //     async function fetchAllArticles() {
    //         try {
    //             const res = await axios.get(
    //                 `${process.env.REACT_APP_API_URL}/api/v1/authors`
    //             );
    //             const { data } = res;
    //             setArticles(data);
    //             console.log(data);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     fetchAllArticles();
    // }, []);
    return <TableArticle />;
}

export default ListArticles;
