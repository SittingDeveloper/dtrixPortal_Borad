import {useEffect, useState} from "react";
import axios from "axios";
import './sidebar.css';
import Pagination from "react-js-pagination";
import './pages.css'

export default function Pray() {

    const [bulletin, setBulletin] = useState<any>();

    const [totalElement, setTotalElement] = useState<any>();

    useEffect(() => {
        axios.get('/api/page')
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(()=> {
        if(bulletin){
            setTotalElement(bulletin.totalPage);
        }
        console.log("게시글 수 : " + totalElement);
    },[bulletin])


    const [page, setPage] = useState(1);
    const handlePageChange = (page : any) => {
        setPage(page);
        console.log(page);
        axios.get('/api/page/' + page)
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }


    // console.log(bulletin);
    // console.log(bulletin?.totalPage);
    // console.log(bulletin?.dtoList);

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
                    totalItemsCount={totalElement*10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />


            </div>

        </div>
    );
};