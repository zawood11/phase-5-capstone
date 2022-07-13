import { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, FormField, Input, Label } from "../styles";
import {UserContext} from "../context/user";

function FriendProfile() {
  const [workout, setWorkout] = useState({});
  const {id} = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [friend, setFriend] = useState({})
//   const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data =>setFriend(data))
  }, []);

//   if (!workout.user || !workout.exercises) return <h1>Loading...</h1>


  const removeFriend = () => {
    // fetch(`/api/users/${friend.id}`, {
    //     method: "DELETE",
    //   }).then((r) => {
    //     if (r.ok) {
    //         history.push("/");
    //     } else {
    //       r.json().then((err) => setErrors(err.errors))
    //     }
    //   });
  }

  const addFriend = () => {

  }

  return (
    <Wrapper>
            <Box>
              <h1>{friend.username}</h1>
              {/* <h2><Link to = {`/workouts/${workout.id}`}>{workout.name}</Link></h2> */}
              <ReactMarkdown>{friend.bio}</ReactMarkdown>
              <h2>Friends</h2>
              <Button onClick={addFriend}>Send Friend Request</Button>
              &nbsp;·&nbsp;
              <Button onClick={removeFriend}>Remove Friend</Button>
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

export default FriendProfile;