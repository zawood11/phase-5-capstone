import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function MovementList() {
  // const {user} = useContext(UserContext)
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    fetch("/api/movements")
      .then((r) => r.json())
      .then(setMovements);
  }, []);

  return (
    <Wrapper>
    <Button as={Link} to="/movements/new">Add a Movement</Button>
      {movements.length > 0 ? (
        movements.map((movement) => (
          <Movement key={movement.id}>
            <Box>
              <h2>{movement.name}</h2>
              {/* <p>
                <em>Time to Complete: {movement.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {movement.user.username}</cite>
              </p> */}
              <ReactMarkdown>{movement.description}</ReactMarkdown>
            </Box>
          </Movement>
        ))
      ) : (
        <>
          <h2>No Recipes Found</h2>
          <Button as={Link} to="/new">
            Make a New Recipe
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Movement = styled.article`
  margin-bottom: 24px;
`;

export default MovementList;