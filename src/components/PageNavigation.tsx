import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

//const RESULTS_PER_PAGE = 20;

interface Props {
    apiUrl: string;
};

const PageNavigation: React.FC<Props> = ({ apiUrl }) => {
    const { pageNumber } = useParams<{ pageNumber: string }>();
    const pageNum = Number(pageNumber);
    const [paginationData, setPaginationData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTkzNzBjM2JlZTIzMjZkNzJlZjBhNGVmMTVhZDgyMCIsInN1YiI6IjY1ZGNlNTAxMzk1NDlhMDE4NzRlODBkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fR4QEHaqcwD8TTvWCVQSrO241D6m2HBFL1rCW2prTSo'
            }
          };

            try {
                const response = await axios.get(apiUrl, options);
                setPaginationData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        //console.log('apiURL: ', apiUrl);
        fetchData();
    }, [pageNum, apiUrl]);

    if (!paginationData) {
        return <div className='page-navigation'>Loading pagination data...</div>;
    }

    const currentPage = paginationData.page;
    const totalPages = paginationData.total_pages;
    //const totalResults = paginationData.total_results;

    return (
        <div>
            <div className="page-navigation">
                {currentPage > 1 ? (
                    <Link to={`/movies/${currentPage - 1}`}>
                        <button>Previous</button>
                    </Link>
                ) : (
                    <Link to={`/movies/${currentPage}`} className='disabled'>
                        <button disabled className='disabled'>Previous</button>
                    </Link>
                )}
                <h3>Page {currentPage} of {totalPages} 
                {/* | Showing {currentPage * 20 - 19} to {totalResults > 20 ? (currentPage * 20) :} of total {totalResults} movies */}</h3>
                
                {currentPage < totalPages ? (
                    <Link to={`/movies/${currentPage + 1}`}>
                        <button>Next</button>
                    </Link>
                ) : (
                    <Link to={`/movies/${currentPage}`} className='disabled'>
                        <button disabled className='disabled'>Next</button>
                    </Link>
                )}
                
            </div>
            
        </div>
    );
};

export default PageNavigation;
