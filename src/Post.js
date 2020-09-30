import React,{useState, useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase';
import firebase from 'firebase';

function Post({postId, user, username, caption, imageUrl}) {

    const [comments, setComments] = useState([]); 
    const [comment, setComment] = useState(''); 

    useEffect( ()=>{
        let unsubscribe;
        if(postId){
            unsubscribe= db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) =>doc.data()));
            });
        }
        return () =>{
            unsubscribe();
        };
    },[postId]);

    const postComment = (event) =>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        
        <div className="post"> 
            {/* Header ->avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Jorge Quintero "
                    src="/stattic/images/avatar/1.jpg"
                /> 
            <h3>{username}</h3>
            </div>
            
            

            {/* Imagen */}
            <img 
                className="post__image"
                src={imageUrl}
                alt=""
            />

            {/* Username +caption */}
            <h4 
                className="post__text">
                <strong>{username}</strong> {caption}
            </h4>

            
            <div className="post__comments">
                {comments.map((comment) =>(
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            {
                user && (
                    <form className="post__commentbox">
                        <input
                            className="post__input"
                            type="text"
                            placeholder="Añadir un comentario ..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="post__button"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            Post
                        </button>
                    </form>
                )
            }
            
        </div>
    )
}

export default Post
