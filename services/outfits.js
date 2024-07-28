import { collection, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const usersCollection = collection(db, 'users');

export const addProductToOutfit = async (userId, outfitTitle, product) => {
    const userRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      let userData = userDoc.data();
      let updatedOutfits = userData.outfits.map(outfit => {
        if (outfit.title === outfitTitle) {
          return {
            ...outfit,
            productLinks: [...outfit.productLinks, product]
          };
        }
        return outfit;
      });
  
      try {
        await updateDoc(userRef, { outfits: updatedOutfits });
        console.log("Product added to outfit for user with ID: ", userId);
      } catch (e) {
        console.error("Error adding product to outfit: ", e);
      }
    } else {
      console.log("No such user!");
    }
  };

// //GET: Get all outfits
// export const getAllOutfits = async () => {
//     try {
//         const querySnapshot = await getDocs(collection(db, 'outfits'));
//         const outfits = [];
//         querySnapshot.forEach((doc) => {
//             outfits.push({ id: doc.id, ...doc.data() });
//         });
//         return outfits;
//     } catch (error) {
//         throw new Error('Failed to fetch outfits');
//     }
// };

// //GET: Get outfit by ID
// export const getOutfitById = async (id) => {
//     try {
//         const docRef = doc(db, 'outfits', id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             return { id: docSnap.id, ...docSnap.data() };
//         } else {
//             throw new Error('No such outfit!');
//         }
//     } catch (error) {
//         throw new Error('Failed to fetch outfit by ID');
//     }
// };

// //POST: Create a new outfit
// export const createNewOutfit = async (outfit) => {
//     try {
//         const docRef = await addDoc(collection(db, 'outfits'), outfit);
//         if (docRef.exists()) {
//             return docRef.id;
//         }
//     } catch (error) {
//         throw new Error('Failed to create new outfit');
//     }
// }

// // PUT: Update an existing outfit
// export const updateOutfit = async (id, updatedOutfit) => {
//     try {
//         const docRef = doc(db, 'outfits', id);
//         await updateDoc(docRef, updatedOutfit);
//     } catch (error) {
//         throw new Error('Failed to update outfit');
//     }
// };