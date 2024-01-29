import { Form, redirect, Link } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  // todo バリデーション とりあえず適当にリダイレクトさせる
  if (typeof title !== "string") return redirect("/todos/new");
  const prisma = new PrismaClient();
  await prisma.todo.create({ data: { title, done: false } });
  return redirect("/todos");
};

export default function TodoNew() {
  return (
    <div>
      <Link to="/">Homeへ</Link>
      <h1>Todoリストを追加する</h1>
      <Form method="post">
        <label htmlFor="text">新規todo名</label>
        <input type="title" name="title" id="title" />
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}
