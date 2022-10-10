import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'


const AuthContext =  createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthContextProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState();
    const [email, setEmail] = useState('');

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return currentUser.updatePassword(password);
    }

    //call only when we mount component
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            
            if(user!==null){
                setEmail(user.email)
            }
            
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        email,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
