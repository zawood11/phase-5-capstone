import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, FormField, Input, Label } from "../styles";

function WorkoutCard() {
  const [workout, setWorkout] = useState({});
  const {id} = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`/api/workouts/${id}`)
      .then(res => res.json())
      .then(data =>setWorkout(data))
  }, []);

  if (!workout.user || !workout.exercises) return <h1>Loading...</h1>


  const deleteWorkout = () => {
    fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          history.push("/");
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      });
  }

  return (
    <Wrapper>
            <Button as={Link} to="/">Back to Workouts</Button>
            <Box>
              <h1><Link to = {`/users/${workout.user}`}>User: {workout.user.username}</Link></h1>
              <h2><Link to = {`/workouts/${workout.id}`}>{workout.name}</Link></h2>
              <p>Minutes: {workout.minutes}</p>
              <p>Calories: {workout.calories}</p>
              <ReactMarkdown>{workout.notes}</ReactMarkdown>
              <h2>Exercises</h2>
              <table style={{width:"100%", textAlign:"left"}}>
                <thead>
                    <tr>
                        <th>Movement</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Rest Interval</th>
                    </tr>
                </thead>
                <tbody>
                {workout.exercises.map(exercise => (
                    <tr key={exercise.id}>
                        <td>{exercise.movement_name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.rest_interval}</td>
                    </tr>
                ))}
                </tbody>
              </table>
              <Button onClick={deleteWorkout}>Delete Workout</Button>
            </Box>
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