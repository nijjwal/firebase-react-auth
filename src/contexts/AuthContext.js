import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'


const AuthContext =  createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthContextProvider({children}) {

    const [currentUser, setCurrentUser] = useState();


    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    //call only when we mount component
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
