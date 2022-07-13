import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, FormField, Input, Label } from "../styles";

function WorkoutList() {
  // const {user} = useContext(UserContext)
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  const filterWorkouts = workouts.filter(workout => workout.name.toLowerCase().includes(search) || workout.user.username.toLowerCase().includes(search))

  return (
    <Wrapper>
    <FormField>
        <Label htmlFor = "search">Search</Label>
        <Input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
    </FormField>
    <Button>All Workouts</Button>
    &nbsp;·&nbsp;
    <Button>My Workouts</Button>
    &nbsp;·&nbsp;   
    <Button as={Link} to="/workouts/new">Add a Workout</Button>
      {filterWorkouts.length > 0 ? (
        filterWorkouts.map((workout) => (
          <Workout key={workout.id}>
            <Box>
              <h1><Link to = {`/users/${workout.user.id}`}>User: {workout.user.username}</Link></h1>
              <h2><Link to = {`/workouts/${workout.id}`}>{workout.name}</Link></h2>
              <p>Minutes: {workout.minutes}</p>
              <p>Calories: {workout.calories}</p>
              <ReactMarkdown>{workout.notes}</ReactMarkdown>
            </Box>
          </Workout>
        ))
      ) : (
        <>
          <h2>No Workouts Found</h2>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Workout = styled.article`
  margin-bottom: 24px;
`;

export default WorkoutList;