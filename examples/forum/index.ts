import { attr, validate, get, item, IItem } from "../../src"

import { Author, Body, Comment, Post, UserName, User, Reply } from "./types"

const userBob = item(User, attr(UserName, "bob.the.builder"))

const comment = item(
  Comment,
  attr(Author, userBob),
  attr(Body, "This is a comment")
)

const post = item(
  Post,
  attr(Author, userBob),
  attr(Body, "This is a post"),
  attr(Reply, comment)
)

console.log(validate(post))

console.log(get(post, Body))

console.log(
  get<string>(post, Reply, Body),
  get<string>(get<IItem>(post, Reply), Body)
)
