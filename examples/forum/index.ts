import {
  attribute,
  IItem,
  validate,
  getAttribute,
  getItem,
  getValue,
  item
} from "../../src"

import {
  AuthorAttributeType,
  BodyAttributeType,
  CommentType,
  PostType,
  UserNameAttributeType,
  UserType
} from "./types"

const userName = attribute(UserNameAttributeType, "bob.the.builder")

const userBob: IItem = {
  attributes: [userName, userName],
  type: UserType
}

const comment = item(CommentType, [
  attribute(AuthorAttributeType, userBob),
  attribute(BodyAttributeType, "This is a comment")
])

const post = item(
  PostType,
  [
    attribute(AuthorAttributeType, userBob),
    attribute(BodyAttributeType, "This is a post")
  ],
  [comment]
)

console.log(validate(post))

console.log(getValue(getAttribute(post, BodyAttributeType)))

console.log(
  getValue(getAttribute(getItem(post, CommentType), BodyAttributeType))
)
