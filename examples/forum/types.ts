import {
  IAttributeConstraint,
  IAttributeType,
  IItemType,
  IItem
} from "../../src"

export const UserNameAttributeType: IAttributeType<string> = {
  attributeLabel: "UserName"
}

export const UserNameAttributeRequiredConstraint: IAttributeConstraint = {
  attributeType: UserNameAttributeType,
  exactQuantity: 1
}

export const UserType: IItemType = {
  attributeConstraints: [UserNameAttributeRequiredConstraint],
  attributeTypes: [UserNameAttributeType],
  itemLabel: "User"
}

export const AuthorAttributeType: IAttributeType<IItem> = {
  attributeLabel: "Author"
}

export const AuthorAttributeRequiredConstraint: IAttributeConstraint = {
  attributeType: AuthorAttributeType,
  exactQuantity: 1
}

export const BodyAttributeType: IAttributeType<string> = {
  attributeLabel: "Body"
}

export const BodyAttributeRequiredConstraint: IAttributeConstraint = {
  attributeType: BodyAttributeType,
  exactQuantity: 1
}

export const CommentType: IItemType = {
  attributeConstraints: [
    AuthorAttributeRequiredConstraint,
    BodyAttributeRequiredConstraint
  ],
  attributeTypes: [AuthorAttributeType, BodyAttributeType],
  itemLabel: "Comment"
}

export const PostType: IItemType = {
  attributeConstraints: [
    AuthorAttributeRequiredConstraint,
    BodyAttributeRequiredConstraint
  ],
  attributeTypes: [AuthorAttributeType, BodyAttributeType],
  itemTypes: [CommentType],
  itemLabel: "Post"
}

export const ForumType: IItemType = {
  itemLabel: "Forum",
  itemTypes: [UserType, PostType]
}
