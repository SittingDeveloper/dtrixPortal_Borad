import {useEffect, useRef, useState} from "react";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko'

import Pagination from "react-js-pagination";
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'

export default function Register() {

    const editorRef = useRef<any>();
    
    const handleRegisterButton = () => {
        console.log("입력된 데이터입니다 ↓ \n" + editorRef.current?.getInstance().getHTML());
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
                              name={"title"}>
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
                    />

                    <br/>
                    <hr/>
                    <br/>

                    <textarea typeof={"title"}
                              placeholder={"작성자 입력"}
                              style={{width: "10%", borderRadius: "10px", fontSize: "20px", textAlign: "center"}}
                              name={"writer"}>
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