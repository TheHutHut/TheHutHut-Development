import firebaseApp from 'src/db-firebase/initialize-firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const addNewDoc = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), data);
};

export { addNewDoc };
