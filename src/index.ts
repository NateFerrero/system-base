export interface IAction {}
export interface IAttribute {}
export interface IConstraint {}
export interface IItem {}
export interface IMember {}
export type Any = IAction | IAttribute | IConstraint | IItem | IMember
export type AttributeValueType = Any | string | number | boolean

export interface IDefinition<T> {}

export interface IType<TSubject, TDefinition = undefined, TValue = undefined> {
  label: string
  definition: TDefinition
}

export interface IItemTypeDefinition extends IDefinition<IItem> {
  attributeTypes?: IType<
    IAttribute,
    IDefinition<IAttribute>,
    AttributeValueType
  >[]
  itemTypes?: IType<IItem, IDefinition<IItem>, undefined>[]
  attributeConstraints?: IConstraintDefinition<any, any>[]
}

export interface IItemDefinition extends IDefinition<IItem> {
  type: IType<IItem, IItemTypeDefinition, undefined>
  attributes?: IAttributeDefinition<AttributeValueType>[]
  items?: IItemDefinition[]
}

export interface IConstraintDefinition<
  T extends Any,
  TAttributeValue extends AttributeValueType
> extends IDefinition<IConstraint> {
  attributeTypes: IType<
    IAttribute,
    IDefinition<IAttribute>,
    AttributeValueType
  >[]
  exactQuantity?: number
}

export interface IAttributeDefinition<
  TAttributeValue extends AttributeValueType
> {
  type: IType<IAttribute, undefined, TAttributeValue>
  value: TAttributeValue
}

type AnyDefinition =
  | IAttributeDefinition<AttributeValueType>
  | IItemDefinition
  | IItemTypeDefinition
  | IConstraintDefinition<Any, AttributeValueType>

export const validate = (object: AnyDefinition) => {
  console.log(object)
}
