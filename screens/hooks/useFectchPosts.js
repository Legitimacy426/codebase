import { useEffect ,useState} from "react"

import { collection, getDocs, query, where,orderBy ,onSnapshot} from "firebase/firestore"
import { db } from "../../firebaseConfig";


const useFetchPosts = (tbl) => {
    const col = tbl;
    const [posts,setPosts] = useState([])
    const [isErrorP,setError] = useState(null)
    const [isPendingP, setPendingP] = useState(true)
   
    useEffect((tbl) => {
        const Posts = []
          
            const userRef = collection(db, "posts")
                    const q = query(userRef,orderBy("createdAt",'desc'))
            getDocs(q).then(users => {
                users.forEach(user => {
                            Posts.push({ ...user.data(),pid:user.id})
                })
                setPosts(Posts)
                 setPendingP(false)
               
            }).catch(err => {
            
                console.log(err.message)
                    })
                
    }, [tbl])
    return {posts,isErrorP,isPendingP}
}
export default useFetchPosts