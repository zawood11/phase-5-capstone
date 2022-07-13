import { useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";
import {UserContext} from "../context/user";

function NewWorkout() {
  //const [userId, setUserId] = useState(null);
  const [name, setName] = useState("Leg Day w/ Conditioning");
  const [minutes, setMinutes] = useState("60");
  const [calories, setCalories] = useState("300")
  const [notes, setNotes] = useState(`Enter workout notes here...`)
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext)

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        name,
        minutes,
        calories,
        notes,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create a Workout</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              type="text"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="calories">Calories</Label>
            <Input
              type="text"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows="10"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Create Workout"}
            </Button>
          </FormField>
          {/* <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField> */}
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{name}</h1>
        <p>
          <em>Minutes: {minutes}</em>
          &nbsp;·&nbsp;
          <em>Calories: {calories}</em>
          &nbsp;·&nbsp;
          <cite>Created By: {user.username}</cite>
        </p>
        <ReactMarkdown>{notes}</ReactMarkdown>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewWorkout;
