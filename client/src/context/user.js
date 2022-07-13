import React, {useState, useCallback} from "react"


const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const onLogin = (userInfo) => {
        setUser(userInfo)
    }

    const getCurrentUser = useCallback(async () => { 
        try {
            const resp = await fetch("/api/me")
             if (resp.status === 200) {
                const data = await resp.json()
                console.log(data)
             } else {
                const errorObj = await resp.json()
                console.log("else clause")
             }
        } catch (e) {
            console.log("catch error")
        }
    })

    return <UserContext.Provider value={{user, setUser, onLogin}}>{ children }</UserContext.Provider>

}

export {UserContext, UserProvider};