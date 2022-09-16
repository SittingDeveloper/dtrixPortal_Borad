import {useEffect, useState} from "react";
import axios from "axios";
import './sidebar.css';
import Pagination from "react-js-pagination";
import './pages.css'

export default function Pray() {

    const [bulletin, setBulletin] = useState<any>();

    useEffect(() => {
        axios.get('/api/page')
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(()=> {
        if(bulletin){

        }
    },[bulletin])


    const [page, setPage] = useState(1);
    const handlePageChange = (page : any) => {
        setPage(page);
        console.log(page);
        axios.get('/api/page')
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }


    // console.log(bulletin);
    // console.log(bulletin?.totalPage);
    // console.log(bulletin?.dtoList);

    console.log(bulletin);

    return (
        <div>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bulletin?.dtoList.map((item : any) =>
                        <tr key={item.bulletinId}>
                            <td>
                                {item.bulletinId}
                            </td>
                            <td>
                                {item.title}
                            </td>
                            <td>
                                {item.writer}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <Pagination
                    activePage={page}
                    totalItemsCount={301}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />


            </div>

        </div>
    );
};