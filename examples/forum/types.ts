import { IItem, defineAttr, required, defineItem } from "../../src"

export const Author = defineAttr<IItem>("Author")
export const Body = defineAttr<string>("Body")
export const Member = defineAttr<IItem>("Member")
export const Reply = defineAttr<IItem>("Reply")
export const Submission = defineAttr<IItem>("Submission")
export const UserName = defineAttr<string>("UserName")

export const User = defineItem("User", [UserName], required(UserName))

export const Comment = defineItem(
  "Comment",
  [Author, Body],
  required(Author),
  required(Body)
)

export const Post = defineItem(
  "Post",
  [Author, Body, Reply],
  required(Author),
  required(Body)
)

export const Forum = defineItem("Forum", [Member, Submission])
