import { Link, Form, redirect, json, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

export const action = async () => {
  return redirect("/todos");
  return { todos };
}

export const loader = async () => {
  const prisma = new PrismaClient();
  const todos = await prisma.todo.findMany();
  return json({ todos });
}

export default function Todo() {
  const todos = useLoaderData<typeof loader>().todos;

  return (
    <>
      <Link to="/">Homeへ</Link>
      <h1>Todo List</h1>
      <Link to="/todo/new">
        <button>新規作成</button>
      </Link>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" name="" id="" checked={todo.done} />
            <input type="text" name="" id="" value={todo.title} />
            <button>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}
