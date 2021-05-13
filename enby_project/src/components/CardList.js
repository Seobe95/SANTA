import React, { useEffect } from 'react';

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import Card from './Card';
import {actionsCreators as postActions} from '../redux/modules/post'

const CardList =(props)=>{
    const dispatch = useDispatch();

    const post_list = useSelector((store) => store.post.list)

    console.log(props)
    const id = post_list.id
    useEffect(()=>{
        dispatch(postActions.getPostMainDB(post_list))
        dispatch(postActions.getPostDetailDB(id))
    }, [dispatch])
    const showReviewCard=()=>{
        if(props.allMoim){
            return (props.all_post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            }))
        }
        if(props.isDeadline){
            return (props.dead_post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            }))
        }
        if(props.isNotDeadline){
            return (props.not_dead_post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            }))
        }
    }
    return (
      <ListBody>
        <PostList>
        {showReviewCard()}
        </PostList>
      </ListBody>
    );
}
const ListBody = styled.div`
    text-align : center;
    width: 100%;
    max-width: 1200px;
    margin: 100px auto 0 auto;
`
const PostList = styled.div`
padding: 0;
margin: 0;
width: 1200px;
`

export default CardList;