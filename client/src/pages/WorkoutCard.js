import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, FormField, Input, Label } from "../styles";

function WorkoutCard() {
  // const {user} = useContext(UserContext)
  const [workout, setWorkout] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    fetch(`/api/workouts/${id}`)
      .then((r) => r.json())
      .then(setWorkout);
  }, []);

  //const filterWorkouts = workouts.filter(workout => workout.name.toLowerCase().includes(search) || workout.user.username.toLowerCase().includes(search))

  return (
    <Wrapper>

          <Workout >
            <Box>
              <h1><Link to = {`/users/${workout.user.id}`}>User: {workout.user.username}</Link></h1>
              <h2><Link to = {`/workouts/${workout.id}`}>{workout.name}</Link></h2>
              <p>Minutes: {workout.minutes}</p>
              <p>Calories: {workout.calories}</p>
              <ReactMarkdown>{workout.notes}</ReactMarkdown>
              <h2>Exercises</h2>
              <Button>Delete Workout</Button>
            </Box>
          </Workout>
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

export default WorkoutCard;