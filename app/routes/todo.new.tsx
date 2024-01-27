import { Form } from "@remix-run/react";

export const action = async () => {
  return { message: "Hello World" };
}

export default function TodoNew() {
  return (
    <div>
      <h1>Create a New Todo</h1>
      <Form method="post">
        <label htmlFor="text">Text</label>
        <input type="text" name="text" id="text" />
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}
