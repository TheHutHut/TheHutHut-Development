import { doc, updateDoc, arrayUnion, getFirestore } from 'firebase/firestore';
import firebaseApp from 'src/db-firebase/initialize-firebase';

const db = getFirestore(firebaseApp);

// updating single value to array in db
const pushSingleValueToArray = async (collectionName, documentName, fieldName, data) => {
    const key = fieldName;
    const ref = doc(db, collectionName, documentName);
    await updateDoc(ref, {
        [key]: arrayUnion(data),
    });
};

//update array in db with multiple values
const pushValuesToArray = async (collectionName, documentName, fieldName, data) => {
    const key = fieldName;
    const ref = doc(db, collectionName, documentName);
    await updateDoc(ref, {
        [key]: arrayUnion(...data),
    });
};

export { pushSingleValueToArray, pushValuesToArray };
