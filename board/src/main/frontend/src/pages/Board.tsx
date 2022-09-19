import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko'
import './sidebar.css';
import Pagination from "react-js-pagination";
import {Link, useNavigate} from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate();

    // Sub-Section 열고 닫는것을 관리 (Toggle 기능)
    const [isOpen, setMenu] = useState(false); // subMenu, default false

    // subTitle 재클릭시 닫는 기능
    const [toggle, setToggle] = useState(0);

    // Sub-Section 개별 실행 state
    const [flagNumber, setFlagNumber] = useState("0");

    // Sub-Section 재클릭시 닫는 기능을 수행하는 Function
    const toggleMenu = (checked_id: any) => {
        if (toggle == checked_id) {
            setToggle(checked_id);
            setMenu(isOpen => !isOpen);
        } else {
            setMenu(() => false);
            console.log("checked_id : " + checked_id)
            setFlagNumber(checked_id);
            setToggle(checked_id);
            setMenu(isOpen => !isOpen); // on,off Boolean 개념
        }
    };


    // Sub-Section 강제로 숨기는 기능
    const hideMenu = () => {
        setMenu(() => false)
    }

    const [bulletin, setBulletin] = useState<any>();

    useEffect(() => {
        axios.get('/api/page')
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));

    }, []);

    const [totalElement, setTotalElement] = useState<any>();

    // 게시글의 총 개수를 구함
    useEffect(() => {
        if (bulletin) {
            setTotalElement(bulletin.totalPage);
        }
    }, [bulletin])

    const [page, setPage] = useState(1);
    const handlePageChange = (page: any) => {
        setPage(page);
        console.log(page);
        axios.get('/api/page/' + page)
            .then(response => setBulletin(response.data))
            .catch(error => console.log(error));
    }

    const searchPage = (item:any) => {
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
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
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
                           className="dropdown-toggle collapsed" onClick={() => hideMenu()}>
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
                        <tr key={item?.bulletinId} onClick={() => searchPage(item)} style={{cursor:"pointer"}}>
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
                                {moment(item.regDate).format('YYYY년 MM월 DD일 hh시mm분')}
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