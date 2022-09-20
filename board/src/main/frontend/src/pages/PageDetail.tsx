import {lazy, useEffect, useState} from "react";
import axios from "axios";
import './sidebar.css';
import './pages.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import moment from "moment";

export default function PageDetail() {


    const navigate = useNavigate();

    const openModify = () => {
        navigate(`/Modify/${params.id}`);
    }

    const params = useParams<any>();
    console.log("파라미터 : " + params.id);

    const [list, setList] = useState<any>([]);

    useEffect(() => {
        axios.get('/board/pageDetail/' + params.id)
            .then(response => setList(response.data))
            .catch(error => console.log(error));
    }, [])

    const [content, setContent] = useState<string>('');
    useEffect(() => {
        if (list.content) {
            setContent(list.content);
        }
    }, [list.content])

    const handleRemoveButton = () => {
        console.log("삭제버튼 클릭");
        console.log("삭제되는 bulletinId : " + list.bulletinId)

        const removeParams = new URLSearchParams();
        removeParams.append('bulletinId', list.bulletinId);

        axios.post("/board/remove", removeParams);

        navigate("/");
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
                    <a href="../">
                        <h1>
                            Portal Board
                        </h1>
                    </a>
                </div>

                <ul className="list-unstyled">

                    <li>
                        <a href="#schoolSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle collapsed">
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
                <h6>
                    조회수 {list.hits}
                </h6>
                <h6>
                    최종수정일 {moment(list.modDate).format('YYYY년 MM월 DD일 HH시mm분')}
                </h6>
                <h3>
                    제목 : {list.title}
                </h3>

                <hr/>
                {content && <Viewer initialValue={content}/>}
                <hr/>

                <h3>
                    작성자 : {list.writer}
                </h3>

                <button onClick={() => openModify()} style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    fontSize: "22px"
                }}>
                    수정
                </button>

                <button onClick={() => handleRemoveButton()} style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    fontSize: "22px"
                }}>
                    삭제
                </button>

            </div>

        </div>
    );
};