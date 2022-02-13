import firebaseApp from 'src/db-firebase/initialize-firebase';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const deleteDocument = async (collectionName, documentName) => {
    const docRef = doc(db, collectionName, documentName);
    await deleteDoc(docRef);
};

export { deleteDocument };
