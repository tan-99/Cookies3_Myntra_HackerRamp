import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

//GET: Get all outfits
export const getAllOutfits = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'outfits'));
        const outfits = [];
        querySnapshot.forEach((doc) => {
            outfits.push({ id: doc.id, ...doc.data() });
        });
        return outfits;
    } catch (error) {
        throw new Error('Failed to fetch outfits');
    }
};

//GET: Get outfit by ID
export const getOutfitById = async (id) => {
    try {
        const docRef = doc(db, 'outfits', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('No such outfit!');
        }
    } catch (error) {
        throw new Error('Failed to fetch outfit by ID');
    }
};

//POST: Create a new outfit
export const createNewOutfit = async (outfit) => {
    try {
        const docRef = await addDoc(collection(db, 'outfits'), outfit);
        if (docRef.exists()) {
            return docRef.id;
        }
    } catch (error) {
        throw new Error('Failed to create new outfit');
    }
}

// PUT: Update an existing outfit
export const updateOutfit = async (id, updatedOutfit) => {
    try {
        const docRef = doc(db, 'outfits', id);
        await updateDoc(docRef, updatedOutfit);
    } catch (error) {
        throw new Error('Failed to update outfit');
    }
};