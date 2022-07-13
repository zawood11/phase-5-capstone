import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewMovement() {
  const [name, setName] = useState("Enter Movement Name Here");
  const [imageUrl, setImageUrl] = useState("https://www.bodybuilding.com/images/2020/xdb/originals/xdb-81e-bench-press-m2-16x9.jpg");
  const [description, setDescription] = useState(`## Here's how you perform the movement.
  
Enter description of the movement here...`);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/movements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image_url: imageUrl,
        description,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/movements");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add a Movement</h2>
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
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Instructions</Label>
            <Textarea
              id="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Movement to Library"}
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
          <em>Image: {imageUrl}</em>
          &nbsp;·&nbsp;
          {/* <cite>By {user.username}</cite> */}
        </p>
        <ReactMarkdown>{description}</ReactMarkdown>
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

export default NewMovement;
