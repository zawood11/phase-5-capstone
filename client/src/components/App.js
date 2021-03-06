import React, { useEffect, useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import WorkoutList from "../pages/WorkoutList";
import NewWorkout from "../pages/NewWorkout";
import WorkoutCard from "../pages/WorkoutCard";
import MovementList from "../pages/MovementList";
import NewMovement from "../pages/NewMovement";
import UserProfile from "../pages/UserProfile";
import {UserContext} from "../context/user";
import FriendProfile from "../pages/FriendProfile";
import EditWorkout from "../pages/EditWorkout";

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
    <NavBar/>
        <main>
            <Switch>
              <Route path="/movements/new">
                <NewMovement />
              </Route>
              <Route path="/movements">
                <MovementList />
              </Route>
              <Route path="/workouts/new">
                <NewWorkout />
              </Route>
              <Route path="/workouts/edit/:id">
                <EditWorkout />
              </Route>
              <Route path="/workouts/:id">
                <WorkoutCard />
              </Route>
              <Route path="/users/:id">
                <FriendProfile />
              </Route>
              <Route path="/me">
                <UserProfile />
              </Route>
              <Route path="/">
                <WorkoutList />
              </Route>
            </Switch>
        </main>
    {/* </UserProvider> */}
    </>
  );
}

export default App;
