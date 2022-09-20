import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko'
import './sidebar.css';
import Pagination from "react-js-pagination";
import {Link, useNavigate} from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate();

    // Pagination 게시글 조회
    const [bulletin, setBulletin] = useState<any>();
    useEffect(() => {
        axios.get('/board/page')
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }, []);

    // 게시글의 총 개수
    const [totalElement, setTotalElement] = useState<any>();
    useEffect(() => {
        if (bulletin) {
            setTotalElement(bulletin.totalPage);
        }
    }, [bulletin])

    // 어느 페이지로 이동할 것인지
    const [page, setPage] = useState(1);
    const handlePageChange = (page: any) => {
        setPage(page);
        console.log(page);
        axios.get('/board/page/' + page)
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }

    // 게시글 상세 페이지로 이동
    const searchPage = (item: any) => {
        const {bulletinId} = item;
        navigate(`/pageDetail/${bulletinId}`)
    }

    return (
        <div>
            <nav id="sidebar">

                <div className="sidebar-header">

                    <div className="middle-button">
                        <button className="top-button" style={{backgroundColor: "#00abff"}}>
                            +게시판
                        </button>
                        <button className="top-button" style={{backgroundColor: "#049b00"}}>
                            +구분선
                        </button>
                        <button className="top-button" style={{backgroundColor: "#bd0000"}}>
                            삭제
                        </button>
                    </div>
                    <a href="">
                        <h1>
                            Portal Board
                        </h1>
                    </a>
                </div>

                <ul className="list-unstyled">

                    <li>
                        <a href="#schoolSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed" >
                            <span className="icon"><i className="fa-solid fa-list"></i></span>
                            Board_1
                        </a>

                        <ul className="collapse list-unstyled" id="schoolSubmenu">
                            <li><a href="#">sub1</a></li>
                            <li><a href="#">sub2</a></li>
                            <li><a href="#">sub3</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#localSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed">
                            <span className="icon"><i className="fa-solid fa-list"></i></span>
                            Board_2
                        </a>

                        <ul className="collapse list-unstyled" id="localSubmenu">
                            <li><a href="#">sub1</a></li>
                            <li><a href="#">sub2</a></li>
                            <li><a href="#">sub3</a></li>
                        </ul>
                    </li>


                    {/*<li>
                        <a href="#praticeMenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
                            <span className="icon"></span>ListMenu</a>

                        SpringBoot에서 넘어온 값을 React로 받은 부분
                        <ul className="collapse list-unstyled" id="praticeMenu">
                            {subTitle.map((item) =>
                                <li key={item.id}><a href="#">{item.subTitle}</a></li>
                            )}
                        </ul>

                    </li>*/}

                </ul>
            </nav>

            <div style={{paddingLeft: "400px", paddingTop: "50px", paddingRight: "70px"}}>

                <Link to={"Register"}>
                    <button style={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "10px",
                        fontSize: "22px"
                    }}>
                        글쓰기
                    </button>
                </Link>

                <hr/>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody>

                    {bulletin?.dtoList && bulletin?.dtoList.map((item: any) => {
                        return (
                            <tr key={item?.bulletinId} onClick={() => searchPage(item)} style={{cursor: "pointer"}}>
                                <td>
                                    {item.bulletinId}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    {item.writer}
                                </td>
                                <td>
                                    {moment(item.regDate).format('YYYY년 MM월 DD일 HH시mm분')}
                                </td>
                                <td>
                                    {item.hits}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <Pagination
                    activePage={page}
                    totalItemsCount={totalElement * 10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />

                <hr/>

            </div>

        </div>
    );
};