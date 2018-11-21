import { attr, validate, get, item, IItem } from "../../src"

import {
  Author,
  Body,
  Comment,
  Post,
  UserName,
  User,
  Reply,
  Forum,
  Member,
  Submission,
  PermissionGrant,
  Permission,
  Role,
  GrantCapability,
  Capability,
  Scope,
  Action
} from "./types"

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

const editPosts = item(Capability, attr(Scope, Post), attr(Action, "edit"))

const userBobCanEditPosts = item(
  Permission,
  attr(Role, userBob),
  attr(GrantCapability, editPosts)
)

const forum = item(
  Forum,
  attr(Member, userBob),
  attr(Submission, post),
  attr(PermissionGrant, userBobCanEditPosts)
)

console.log(validate(post))

console.log(get(post, Body))

console.log(
  get<string>(post, Reply, Body),
  get<string>(get<IItem>(post, Reply), Body)
)
