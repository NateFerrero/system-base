import { IItem, defineAttr, required, defineItem, IItemType } from "../../src"

export const Author = defineAttr<IItem>("Author")
export const Body = defineAttr<string>("Body")
export const Member = defineAttr<IItem>("Member")
export const Reply = defineAttr<IItem>("Reply")
export const Submission = defineAttr<IItem>("Submission")
export const UserName = defineAttr<string>("UserName")
export const Role = defineAttr<IItem>("Role")
export const Action = defineAttr<string>("Action")
export const Scope = defineAttr<IItemType>("Scope")

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

export const Permission = defineItem(
  "Permission",
  [Role, Scope, Action],
  required(Role),
  required(Action)
)

export const FeaturePermission = defineAttr<IItem>("FeaturePermission")
export const Feature = defineItem("Feature", [FeaturePermission])
export const ActivatedFeature = defineAttr<IItem>("EnabledFeature")

export const Forum = defineItem("Forum", [Member, Submission, ActivatedFeature])
