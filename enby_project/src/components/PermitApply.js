import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionsCreators as applyActions} from '../redux/modules/apply'


const PermitApply = (props) => {
    const dispatch = useDispatch();
    
    const detail_list = useSelector((store) => store.post.detail_list)
    const id = detail_list.id
    const register_id = props.register_id
    
    const acceptApply =()=>{
        dispatch(applyActions.acceptApplyDB(id, register_id))
    }
    const rejectApply=()=>{
        dispatch(applyActions.rejectApplyDB(id, register_id))
    }

    return (
      <Container>
        <CheckBox>
          <CheckMe>
            <CheckImg src={props.profile_img} />
            <CheckId>{props.nickname}</CheckId>
          </CheckMe>
          <CheckContents>
            {props.accepted ? (
              <CheckKakaoID>
                <CheckH>Kakao ID : {props.kakao_id}</CheckH>
              </CheckKakaoID>
            ) : (
              ""
            )}

            <CheckComment>
              <CheckP>{props.contents}</CheckP>
            </CheckComment>
          </CheckContents>
        </CheckBox>
        <CheckButtonBox>
          {props.accepted ? (
            <CheckAccept>수락하셨습니다</CheckAccept>
          ) : (
            <div>
              <AcceptButton onClick={acceptApply}>수락하기</AcceptButton>
              <RejectButton onClick={rejectApply}>거절하기</RejectButton>
            </div>
          )}
        </CheckButtonBox>
      </Container>
    );
}
const Container = styled.div`
display : flex;
margin-top : 34px;
padding-bottom : 28px;
border-bottom : 1px solid #C8C8C8;
`
const CheckBox = styled.div`

    display : flex;    
    
`
const CheckMe = styled.div`
display : flex;
width : 196px;
`
const CheckImg = styled.img`
    width : 24px;
    height : 24px;
    border-radius : 24px;
    margin-top : 3px;
    margin-right : 10px;
`
const CheckId = styled.p`
    margin : 0;
    font-size : 18px;
    font-family : notosans_regular;
`
const CheckContents = styled.div`
    margin-left : 24px;
`
const CheckKakaoID = styled.div`
width : 1000px;
margin-bottom : 22px;
`
const CheckH = styled.h1`
    margin : 0px;
    font-size : 18px;
    font-family : notosans_regular;
`
const CheckComment = styled.div`
width : 1000px;
`
const CheckP = styled.p`
    margin : 0;
    font-size : 18px;
    font-family : notosans_regular;
    max-width : 1000px;
`
const CheckButtonBox = styled.div`
`
const CheckAccept = styled.button`
    width: 167px;
    height: 40px;
    font-size : 18px;
    font-family : notosans_regular;
    border : none;
    border-radius : 20px;
    outline : none;
    background-color : #F1B100;
`
const AcceptButton = styled.button`
  width: 167px;
  height: 40px;
  font-size : 18px;
  font-family : notosans_regular;
  border : none;
  border-radius : 20px;
  outline : none;
  background-color : #F1B100;
  padding-bottom : 2px;
  cursor : pointer;
  margin-bottom : 10px;
`;

const RejectButton = styled.button`
  width: 167px;
  height: 40px;
  font-size : 18px;
  font-family : notosans_regular;
  border-radius : 20px;
  background-color : white;
  padding-bottom : 2px;
  cursor : pointer;
`;

export default PermitApply;