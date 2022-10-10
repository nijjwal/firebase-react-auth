import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'


const AuthContext =  createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthContextProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState();
    const [email, setEmail] = useState();

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    //call only when we mount component
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setEmail(user.email)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        email
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
