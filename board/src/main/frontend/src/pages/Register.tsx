import {useRef, useState} from "react";
import axios from "axios";
import 'moment/locale/ko'
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'
import {useNavigate} from "react-router-dom";

export default function Register() {

    let navigatge = useNavigate();

    const editorRef = useRef<any>();
    
    const handleRegisterButton = () => {

        console.log("저장버튼을 클릭")

        console.log("제목 : " + title);
        console.log("내용 : " + editorRef.current?.getInstance().getHTML());
        console.log("작성자 : " + writer)

        const params = new URLSearchParams();
        params.append('title', title);
        params.append('content', editorRef.current.getInstance().getHTML());
        params.append('writer', writer);
        params.append('hits', "0");

        axios.post("board/register", params);

        navigatge("/");
    }

    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");

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
                    <a href="./">
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
                              onChange={e => setTitle(e.target.value)}>
                    </textarea>

                    <br/>
                    <hr/>
                    <br/>

                    <Editor
                        previewStyle={"vertical"}
                        height={"700px"}
                        initialEditType={"wysiwyg"}
                        useCommandShortcut={false}
                        // onChange={textOnchange}
                        ref={editorRef}
                        hideModeSwitch={true}
                        initialValue={" "}
                    />

                    <br/>
                    <hr/>
                    <br/>

                    <textarea typeof={"title"}
                              placeholder={"작성자 입력"}
                              style={{width: "10%", borderRadius: "10px", fontSize: "20px", textAlign: "center"}}
                              name={"writer"}
                              onChange={e => setWriter(e.target.value)}>
                    </textarea>

                    <button type={"submit"} className={"doubleButton"}
                            style={{backgroundColor: "whitesmoke", color: "black"}}
                            onClick={handleRegisterButton}>
                        저장
                    </button>

                </div>

            </div>

        </div>
    );
};