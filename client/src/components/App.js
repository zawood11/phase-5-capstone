import React, { useEffect, useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import {UserContext, UserProvider} from "../context/user";

function App() {
  //const [user, setUser] = useState(null);
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, [setUser]);

  if (!user) return <Login onLogin={setUser}/>;

  return (
    <>
    {/* <UserProvider> */}
    <NavBar user={user} setUser={setUser}/>
        <main>
            <Switch>
              <Route path="/new">
                <NewRecipe />
              </Route>
              {/* <Route path="/movements">
                <MovementList />
              </Route> */}
              <Route path="/">
                <RecipeList />
              </Route>
            </Switch>
        </main>
    {/* </UserProvider> */}
    </>
  );
}

export default App;
