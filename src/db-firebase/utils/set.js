import { doc, setDoc, getFirestore } from 'firebase/firestore';
import firebaseApp from 'src/db-firebase/initialize-firebase';

const db = getFirestore(firebaseApp);

const setNewDoc = async (collectionName, documentName, data) => {
    await setDoc(doc(db, collectionName, documentName), data);
};

export { setNewDoc };
