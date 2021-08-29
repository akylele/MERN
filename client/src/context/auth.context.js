import React from 'react'

const AuthContext = React.createContext({
    token:null,
    userId:null,
    login: ()=>{},
    logout:()=>{},
    isAuthenticated:false,
    len:null,
    getLen:()=>{}
})

export default AuthContext