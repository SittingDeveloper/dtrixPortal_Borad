import {lazy, useEffect, useState} from "react";
import axios from "axios";
import './sidebar.css';
import './pages.css'
import {useParams} from "react-router-dom";
import {Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function PageDetail() {

    const params = useParams();
    console.log("파라미터 : " + params.id);

    const [list, setList] = useState<any>([]);

    useEffect(() => {
        axios.get('/api/pageDetail/' + params.id)
            .then(response => setList(response.data))
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        if (list) {
            console.log("받아온 값 : " + list?.title);
        }
    })

    const [content,setContent] = useState<string>('');
    useEffect(()=> {
        if(list.content) {
            setContent(list.content);
        }
    },[list.content])

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
                <h3>
                    제목 : {list.title}
                </h3>

                <hr/>
                    {/*<ViewerComponent content={list?.content} />*/}
                    {
                        content && <Viewer initialValue={content}/>
                    }
                    {/*<Viewer initialValue={"<p>asd</p>"}/>*/}
                <hr/>

                <h3>
                    작성자 : {list.writer}
                </h3>

            </div>

        </div>
    );
};