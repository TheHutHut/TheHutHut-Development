import firebaseApp from 'src/db-firebase/initialize-firebase';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const getCollection = async (collectionName) => {
    const collectionData = collection(db, collectionName);
    const snapshot = await getDocs(collectionData);

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
};

const getDocument = async (collectionName, documentName) => {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return null;
};

export { getCollection, getDocument };
