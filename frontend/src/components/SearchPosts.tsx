// import React, { useState, useEffect } from 'react';
// import { db } from '../../../backend/firebase';
// import { collection, query, where, onSnapshot } from '../../../node_modules/.pnpm/firebase-admin@11.5.0/node_modules/firebase-admin/lib/firestore/index'; 

// const SearchPosts = () => {
//     // "searchTerm" stores current value of search input
//     const [searchTerm, setSearchTerm] = useState('');
//     // "posts" holds the search results
//     const [posts, setPosts] = useState([]);

//     // runs whenever searchTerm changes
//     useEffect(() => {
//         let unsubscribe = () => {};

//         if (searchTerm !== '') {
//             // query that searches "posts" collection in Firestone
//             // looks for docs where the "title" field starts with "searchTerm"
//             // goes from "searchTerm" to "searchTerm + \uf8ff" to include all titles beginning with "searchTerm"
//             const q = query(collection(db, "posts"), where("class", ">=", searchTerm), where("class", "<=", searchTerm + '\uf8ff'));

//             // onSnapshot listens for real-time updates to the query results 
//             // so that whenever the data changes, the callback function updates "posts" with the new data
//             unsubscribe = onSnapshot(q, (querySnapshot) => {
//                 const postsArray = querySnapshot.docs.map(doc => ({
//                     id: doc.id, ...doc.data()
//                 }));
//                 setPosts(postsArray);
//             });
//         } else { 
//             // Clears posts if there is no search term
//             setPosts([]);
//         }
//         // unsubscribe from query when component unmounts or when "searchTerm" changes to prevent memory leaks
//         return () => unsubscribe();
        
//     }, [searchTerm]);



//     return (
//         <div>
//             {/* text input that updates "searchTerm" on every keystoke; trigger useEffect */}
//             <input
//                 type="text"
//                 placeholder="EX. CS4820"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div>
//                 {posts.map(post => (
//                     <div key={post.id}>
//                         <h3>Class: {post.class}</h3>
//                         <p>User ID: {post.userId}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );   

// };

// export default SearchPosts;