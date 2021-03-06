import {ADD_POST, DELETE_POST, DOWNVOTE_POST, RECEIVE_ALL_POSTS, UPDATE_POST, UPVOTE_POST} from "../actions/posts";
import {ADD_COMMENT, DELETE_COMMENT} from "../actions/comments";

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return action.posts.reduce((object, value)=> {
                object[value.id] = value;
                return object;
            }, {});
        case ADD_POST:
        case UPDATE_POST:
            const post = action.post;
            return {
                ...state,
                [post.id]: post
            };
        case UPVOTE_POST:
            const upvoteId = action.id;
            if (state[upvoteId]) {
                return {
                    ...state,
                    [upvoteId]: {
                        ...state[upvoteId],
                        voteScore: state[upvoteId].voteScore + 1
                    }
                }
            } else {
                return state;
            }
        case DOWNVOTE_POST:
            const downvoteId = action.id;
            if (state[downvoteId]) {
                return {
                    ...state,
                    [downvoteId]: {
                        ...state[downvoteId],
                        voteScore: state[downvoteId].voteScore - 1
                    }
                }
            } else {
                return state;
            }
        case DELETE_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    deleted: true,
                }
            };
        case ADD_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: {
                    ...state[action.comment.parentId],
                    commentCount: state[action.comment.parentId].commentCount + 1,
                }
            };
        case DELETE_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: {
                    ...state[action.comment.parentId],
                    commentCount: state[action.comment.parentId].commentCount - 1,
                }
            };
        default:
            return state;
    }
}