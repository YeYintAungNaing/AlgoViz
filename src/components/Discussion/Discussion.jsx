import { useContext, useEffect,  useState } from 'react'
import {  db } from '../../firebase/firebase-config'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore'
import './Discussion.scss'


import { Link } from 'react-router-dom'
import { formatDistanceToNow } from "date-fns";
import Report from "../../imgs/Report.png"
import Upvote from "../../imgs/Upvote.png"
import  { GlobalContext } from '../../context/GlobalState';


export default function Discussion() {

  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const {currentUser} = useContext(GlobalContext)

  useEffect(() => {

    const commentsCollectionRef = collection(db, "comments");
    
    // Query to order comments by timeStamp and filter out replies (parentCommentId = null)
    const q = query(commentsCollectionRef, where("parentCommentId", "==", null), orderBy("timeStamp", "asc"));
  
    // Listen to Firestore collection in real-time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => {
        const comment = { id: doc.id, ...doc.data() };
        
        // Create a real-time listener for replies
        const repliesQuery = query(
          collection(db, "comments"),
          where("parentCommentId", "==", comment.id),
          orderBy("timeStamp", "asc")
        );
  
        // Listen to replies in real-time
        const unsubscribeReplies = onSnapshot(repliesQuery, (replySnapshot) => {
          const replies = replySnapshot.docs.map(replyDoc => ({
            id: replyDoc.id,
            ...replyDoc.data()
          }));
  
          // Update comment with replies
          setComments(prevComments => 
            prevComments.map(c => c.id === comment.id ? { ...c, replies } : c)
          );
        });
  
        return { ...comment, unsubscribeReplies };
      });
      console.log('read')
      setComments(commentsData);
    });
  
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  //console.log('redered')

  async function handleAddComment() {

    if (!currentUser) {
      alert('you must log in first')
      return
    }

    try{
      await addDoc(collection(db, "comments"), {
        content: content,
        userId: currentUser.uid,
        userName: currentUser.userName,  // Use stored username
        timeStamp: serverTimestamp(),
        likes: 0,
        reports: 0,
        parentCommentId: null
      });
      console.log('added successfully')
      setContent("")
    }
    catch(err) {
      console.error(err)
    }
  }

  async function handleAddReply(parentCommentId) {
    if (!currentUser) {
      alert('You must log in first');
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        content: replyContent,
        userId: currentUser.uid,
        userName: currentUser.userName,
        timeStamp: serverTimestamp(),
        likes: 0,
        reports: 0,
        parentCommentId: parentCommentId  // Link reply to the parent comment
      });
      console.log('Reply added successfully');
      setReplyContent('');
      setReplyingTo(null);  // Reset replying state
    } catch (err) {
      console.error(err);
    }
  }

  //console.log(currentUser)
  return (
    <div className='discussion-container'>
      <h2>Add a Comment</h2>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your comment"
      />
      <button onClick={handleAddComment} disabled={!content}>
        Comment
      </button>
      <Link to='/'>
        <button>Register</button>
      </Link>

      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <div className='comment' key={comment.id} style={{ marginBottom: '20px' }}>
            <p>
              <strong>{comment.userName}</strong> •{' '}
              {comment.timeStamp
                ? formatDistanceToNow(comment.timeStamp.toDate(), { addSuffix: true })
                : 'Just now'}
            </p>
            <p>{comment.content}</p>
            <div className='comment-actions'>
              <img src={Upvote} alt='' />
              <p>{comment.likes}</p>
              <button onClick={() => setReplyingTo(comment.id)}>Reply</button>
              <img src={Report} alt='' />
            </div>

            {/* Render reply input for this comment */}
            {replyingTo === comment.id && (
              <div style={{ marginLeft: '20px' }}>
                <input
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder='Enter your reply'
                />
                <button onClick={() => handleAddReply(comment.id)} disabled={!replyContent}>
                  Submit Reply
                </button>
              </div>
            )}

            {/* Render replies */}
            {comment.replies && (
              <ul>
                {comment.replies.map((reply) => (
                  <li key={reply.id} style={{ marginLeft: '20px' }}>
                    <p>
                      <strong>{reply.userName}</strong> •{' '}
                      {reply.timeStamp
                        ? formatDistanceToNow(reply.timeStamp.toDate(), { addSuffix: true })
                        : 'Just now'}
                    </p>
                    <p>{reply.content}</p>
                    <div className='comment-actions'>
                      <img src={Upvote} alt='' />
                      <p>{reply.likes}</p>
                      <button onClick={() => setReplyingTo(reply.id)}>Reply</button>
                      <img src={Report} alt='' />
                    </div>

                    {/* Render reply input for this reply */}
                    {replyingTo === reply.id && (
                      <div style={{ marginLeft: '20px' }}>
                        <input
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder='Enter your reply'
                        />
                        <button onClick={() => handleAddReply(comment.id)} disabled={!replyContent}>
                          Submit Reply
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
