import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, FormField, Input, Label } from "../styles";

function MovementList() {
  // const {user} = useContext(UserContext)
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/movements")
      .then((r) => r.json())
      .then(setMovements);
  }, []);

  const filterMovements = movements.filter(movement => movement.name.toLowerCase().includes(search))

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
    <Button as={Link} to="/movements/new">Add a Movement</Button>
      {filterMovements.length > 0 ? (
        filterMovements.map((movement) => (
          <Movement key={movement.id}>
            <Box>
              <h2>{movement.name}</h2>
              {/* <p>
                <em>Time to Complete: {movement.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {movement.user.username}</cite>
              </p> */}
              <ReactMarkdown>{movement.description}</ReactMarkdown>
              {/* <Button>Remove From Library</Button> */}
            </Box>
          </Movement>
        ))
      ) : (
        <>
          <h2>No Movements Found</h2>
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