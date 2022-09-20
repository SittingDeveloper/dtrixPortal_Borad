import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Editor} from "@toast-ui/react-editor";

// 수정
export default function Modify() {

    let navigate = useNavigate();

    // 이전 페이지에서 bulletinId 가져옴. 보안 Issue 존재. url에 표기하지않고 id값 가져오는 방법 필요 ..
    const params = useParams();
    console.log("파라미터 : " +params.id);

    // 표기할 내용을 list로 가져옴
    const [list, setList] = useState<any>([]);
    useEffect(() => {
        axios.get('/board/pageDetail/' + params.id)
            .then(response => setList(response.data))
            .catch(error => console.log(error));
    }, [])

    // 게시글 Title
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (list.title) {
            setTitle(list.title);
        }
    }, [list.title])

    // 수정 Button 클릭 시 일어나는 Function
    const handleRegisterButton = () => {

        console.log("수정버튼을 클릭")
        console.log("제목 : " + title);
        console.log("내용 : " + editorRef.current?.getInstance().getHTML());

        const modifyParams = new URLSearchParams();
        modifyParams.append('bulletinId', list?.bulletinId)
        modifyParams.append('title', title);
        modifyParams.append('content', editorRef.current.getInstance().getHTML());

        axios.post("/board/modify", modifyParams);

        navigate("/");
    }

    // toast ui 게시글 내용 조회를 위해 필요한 state
    const editorRef = useRef<any>();

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


                </ul>
            </nav>

            <div style={{paddingLeft: "400px", paddingTop: "50px", paddingRight: "70px"}}>

                <div>

                    <textarea typeof={"title"}
                              placeholder={"제목을 입력하세요"}
                              style={{width: "80%", borderRadius: "10px", fontSize: "20px"}}
                              name={"title"}
                              onChange={e => setTitle(e.target.value)}
                              defaultValue={list.title}>
                    </textarea>

                    <br/>
                    <hr/>
                    <br/>

                    {list.content &&
                        <Editor
                        previewStyle={"vertical"}
                        height={"700px"}
                        initialEditType={"wysiwyg"}
                        useCommandShortcut={false}
                        // onChange={textOnchange}
                        ref={editorRef}
                        hideModeSwitch={true}
                        initialValue={list.content}/>
                    }

                    <br/>
                    <hr/>
                    <br/>

                    <textarea typeof={"title"}
                              style={{width: "10%", borderRadius: "10px", fontSize: "20px", textAlign: "center", backgroundColor:"whitesmoke"}}
                              name={"writer"}
                              defaultValue={list.writer}
                              readOnly={true}
                    >
                    </textarea>

                    <button type={"submit"} className={"doubleButton"}
                            style={{backgroundColor: "whitesmoke", color: "black"}}
                            onClick={handleRegisterButton}>
                        수정
                    </button>

                </div>

            </div>

        </div>
    );
};