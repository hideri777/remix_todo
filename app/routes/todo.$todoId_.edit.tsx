import { Form, Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect} from "@remix-run/node";


export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  // todo バリデーション とりあえず適当にリダイレクトさせる
  if (typeof title !== "string") return redirect("/todos/new");
  const prisma = new PrismaClient();
  await prisma.todo.update({ where: { id: Number(params.todoId) }, data: { title } });
  return redirect("/todo");
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // 本当はpramsのバリデーションを入れる
  const todoId = params.todoId;
  const prisma = new PrismaClient();
  const todo = await prisma.todo.findUnique({ where: { id: Number(todoId) } });
  // Todo: todoがなかったら404を返す
  return json({ todo });
};

export default function TodoNew() {
  const todo = useLoaderData<typeof loader>().todo;
  return (
    <div>
      <Link to="/">Homeへ</Link>
      <h1>Todoリストを編集する</h1>
      <Form method="post">
        <label htmlFor="text">編集するtodo名</label>
        <input type="title" name="title" id="title" defaultValue={todo?.title} />
        <button type="submit">保存</button>
      </Form>
    </div>
  );
}
