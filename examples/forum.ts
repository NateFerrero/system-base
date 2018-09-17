import {
  IAttribute,
  IItem,
  IItemDefinition,
  IType,
  IConstraintDefinition,
  IAttributeDefinition,
  IItemTypeDefinition,
  validate
} from "../src"

const BodyAttributeType: IType<IAttribute, undefined, string> = {
  label: "Body",
  definition: undefined
}

const CommentType: IType<IItem, IItemTypeDefinition> = {
  label: "Comment",
  definition: {
    attributeTypes: [BodyAttributeType]
  }
}

const BodyAttributeRequiredConstraint: IConstraintDefinition<
  IAttribute,
  string
> = {
  attributeTypes: [BodyAttributeType],
  exactQuantity: 1
}

const PostType: IType<IItem, IItemTypeDefinition> = {
  label: "Post",
  definition: {
    attributeTypes: [BodyAttributeType],
    itemTypes: [CommentType],
    attributeConstraints: [BodyAttributeRequiredConstraint]
  }
}

const commentBody: IAttributeDefinition<string> = {
  type: BodyAttributeType,
  value: "test"
}

const comment: IItemDefinition = {
  type: CommentType,
  attributes: [commentBody]
}

const postBody: IAttributeDefinition<string> = {
  type: BodyAttributeType,
  value: "This is a post"
}

const post: IItem = {
  type: PostType,
  attributes: [],
  items: [comment]
}

console.log(validate(post))
