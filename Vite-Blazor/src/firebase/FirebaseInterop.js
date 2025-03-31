import { auth, db } from "./config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, onSnapshot, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';


export const registerUser = async (email, password) =>
{
    try 
    {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return true;
    }
    catch (error)
    {
        console.error("Error creating account: ", error.code, error.message)
        return false;
    }
}

export const loginUser = async (email, password) =>
{
    try
    {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return true;
    }
    catch (error)
    {
        console.error("Error logging in: ", error.code, error.message)
        return false;
    }
}
export const logoutUser = async () =>
{
    try 
    {
        await auth.signOut();
        return true;
    }
    catch (error)
    {
        console.error("Error logging out: ", error.code, error.message)
    }
}

export function monitorAuthState(dotNetObj)
{
    onAuthStateChanged(auth, (user) =>
    {
        if (user && !user.isAnonymous)
        {
            const userInfo =
                {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                };
            dotNetObj.invokeMethodAsync("ReceiveUserAuthInfo", userInfo);
        }
        else
        {
            dotNetObj.invokeMethodAsync("ReceiveUserAuthInfo", null);
        }
    });
}

export const handleItem = async (item, action) =>
{
    try 
    {
        const collectionRef = collection(db, "Inventory/LWHInv/Items");
        
        switch (action)
        {
            case "add":
                await addDoc(collectionRef, item);
                break;
            case "delete":
                await deleteDoc(doc(db, "Inventory/LWHInv/Items", item.id));
                break;
            case "update":
                await setDoc(collectionRef, item, { merge: true});
        }
    }
    catch (error)
    {
        console.error(`Error ${action}-ing item (${item}): ${error.code}, ${error.message}`)
    }
}
export const handleFetch = async (task) =>
{
    try
    {
        const collectionRef = collection(db, "Inventory/LWHInv/Items");
        const querySnap = await getDocs(collectionRef);

        switch (task)
        {
            case "all":
                const invItems = [];
                querySnap.forEach((doc) =>
                {
                    invItems.push({id: doc.id, ...doc.data()});
                });
                return JSON.stringify(invItems);
                
            case "size":
                return querySnap.size;
                
            case "types":
                const locations = new Set();
                const categories = new Set();
                
        }
    }
    catch (error)
    {
        console.error(`Error fetching ${action}: ${error.code}, ${error.message}`)
    }
}