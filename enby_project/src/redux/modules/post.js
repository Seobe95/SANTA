import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';

const GET_POST_MAIN = "GET_POST_MAIN"
const GET_POST_DETAIL = "GET_POST_DETAIL"
const ADD_POST = "ADD_POST";

const getPostMain = createAction(GET_POST_MAIN, (post_list) => post_list);
const getPostDetail = createAction(GET_POST_DETAIL, (post_list) => post_list);
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));



const initialState = {
    list : [],
    detail_list : [],
};

const getPostMainDB =()=>{
    return function (dispatch, getState, {history}) {
        axios
        .get(`http://3.36.67.251:8080/main/board`)
        .then((response) => {
            const post_list = [...response.data]
            dispatch(getPostMain(post_list))
        }
        )
        .catch((err) => console.log(err))
    }
}

const getPostDetailDB = (id) =>{
    return function (dispatch, getState, {history}){
        axios
        .get(`http://3.36.67.251:8080/board/mating/` + `${id}`)
        .then((res) => {
            console.log(res)
            const post_list = [...res.data.boards]
            dispatch(getPostDetail(post_list[0]))
            console.log(post_list)
        })
        .catch((err) => console.log(err))
    }
}

// 게시글 추가하기
const addPostDB = (title, contents, boardImg, location, meetTime) => {
    return function (dispatch, getState, {history}) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("boardImg", boardImg);
        formData.append("location", "321");
        formData.append("meetTime", "2021-04-29T16:14:13");
        

        const DB = {
            method: "post",
            url: `http://3.36.67.251:8080/board/mating`,
            data: formData,
        };

        axios(DB)
            .then(() => {
                window.alert("등록완료 되었습니다 :)");
                history.push("/");
            })
            .catch((err) => {
                window.alert("에러가 발생했습니다. 다시 시도해주세요!");
                console.log(err);
            });
    };
};

export default handleActions(
    {
    [GET_POST_MAIN] : (state, action) =>
        produce(state, (draft) => {
            draft.list = action.payload
        }),
    [GET_POST_DETAIL] : (state, action) => 
        produce(state, (draft) => {
            draft.detail_list = action.payload
        }),
}, initialState
)

const actionsCreators = {
    addPost,
    getPostMainDB,
    getPostDetailDB,
    addPostDB
};

export {actionsCreators};