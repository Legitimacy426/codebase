import { useEffect, useState } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const useFetchPost = (id) => {
  const [post, setPost] = useState();
  const [isErrorP, setError] = useState(null);
  const [isPendingP, setPendingP] = useState(true);

  useEffect(
    (tbl) => {
      const Posts = [];

      const userRef = doc(db, "posts", id);
      getDoc(userRef)
        .then((doc) => {
          console.log(doc.data());

          setPost(doc.data());
          setPendingP(false);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    [id]
  );
  return { post, isErrorP, isPendingP };
};
export default useFetchPost;
