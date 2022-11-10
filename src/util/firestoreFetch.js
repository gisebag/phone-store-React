import { query, orderBy, where, collection, getDocs } from '@firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import db from '../util/firebaseConfig';

export const fetchFireBase = async (idCategory) => {
    let findCollection;

    if (idCategory) {
        findCollection = query(collection(db, "products"), where('categoryId', '==', idCategory));
    } else {
        findCollection = query(collection(db, "products"), orderBy('price'));
    }

    const querySnapshot = await getDocs(findCollection);
    const dataFireBase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    return dataFireBase;
}


export async function fetchSingleFireBase(idItem) {
    const docRef = doc(db, "products", idItem);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: idItem,
            ...docSnap.data()
        }
    } else {
        console.log("No such document!");
    }
}