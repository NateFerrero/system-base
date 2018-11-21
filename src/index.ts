export interface IConcept {}
export interface IActionConcept extends IConcept {}
export interface IAttributeConcept extends IConcept {}
export interface IConstraintConcept extends IConcept {}
export interface IItemConcept extends IConcept {}
export interface IMemberConcept extends IConcept {}
export type Value = string | number | boolean
export type Any = IConcept | Value

export interface IDefinition<T> {
  attributeConstraints?: IAttributeConstraint[]
  attributeTypes?: IAttributeType<Any>[]
  itemLabel: string
}

export interface IAttributeType<T extends Any> {
  attributeLabel: string
}

export type IItemType = IDefinition<IItemConcept>

export interface IAttribute<T extends Any> {
  type: IAttributeType<T>
  value: T
}

export interface IAttributeConstraint {
  attributeType: IAttributeType<Any>
  exactQuantity?: number
}

export interface IItem {
  attributes?: IAttribute<Any>[]
  items?: IItem[]
  type: IDefinition<IItemConcept>
}

export const validate = (item: IItem) => _validate(item)

const _validate = (item: IItem, context: string = "") => {
  const errors: string[] = []

  if (item.attributes !== undefined && item.attributes.length > 0) {
    const { attributeTypes } = item.type

    if (attributeTypes !== undefined) {
      item.attributes.forEach(attribute => {
        if (attributeTypes.indexOf(attribute.type) === -1) {
          errors.push(
            `${context}${item.type.itemLabel}#${
              attribute.type.attributeLabel
            } attribute not allowed`
          )
        }

        if (
          typeof attribute.value !== "string" &&
          typeof attribute.value !== "boolean" &&
          typeof attribute.value !== "number"
        ) {
          if ("type" in attribute.value) {
            errors.push.apply(
              errors,
              _validate(attribute.value as IItem, `${item.type.itemLabel}.`)
            )
          }
        }
      })
    } else {
      errors.push(`${context}${item.type.itemLabel}#* attributes not allowed`)
    }
  }

  if (item.type.attributeConstraints !== undefined) {
    for (const constraint of item.type.attributeConstraints) {
      const matchingAttributes =
        item.attributes === undefined
          ? []
          : item.attributes.filter(
              attribute => constraint.attributeType === attribute.type
            )

      if (constraint.exactQuantity !== undefined) {
        if (matchingAttributes.length !== constraint.exactQuantity) {
          errors.push(
            `${context}${item.type.itemLabel}#${
              constraint.attributeType.attributeLabel
            } found ${matchingAttributes.length} and expecting exactly ${
              constraint.exactQuantity
            }`
          )
        }
      }
    }
  }

  return errors
}

export const getValue = <T>(attribute: IAttribute<T>) =>
  attribute === undefined ? undefined : attribute.value

export const get = <T>(
  item?: IItem,
  ...attributeTypes: IAttributeType<Any>[]
): T | undefined => {
  if (item === undefined) {
    return undefined
  }
  let nextItem: IItem = item
  let attributeType: IAttributeType<Any> | undefined
  while ((attributeType = attributeTypes.shift())) {
    let matchingAttribute =
      nextItem === undefined || nextItem.attributes === undefined
        ? undefined
        : nextItem.attributes.find(
            attribute => attribute.type === attributeType
          )

    if (
      matchingAttribute !== undefined &&
      matchingAttribute.value &&
      typeof matchingAttribute.value === "object" &&
      "type" in matchingAttribute.value
    ) {
      nextItem = matchingAttribute.value
    } else if (matchingAttribute === undefined) {
      return undefined
    } else {
      return matchingAttribute.value as T
    }
  }
  return nextItem
}
export const attr = <T>(type: IAttributeType<T>, value: T) => ({
  type,
  value
})

export const item = (
  type: IItemType,
  ...attributes: IAttribute<Any>[]
): IItem => ({
  type,
  attributes
})

export const defineItem = (
  itemLabel: string,
  attributeTypes: IAttributeType<Any>[] = [],
  ...attributeConstraints: IAttributeConstraint[]
): IItemType => ({
  itemLabel,
  attributeTypes,
  attributeConstraints
})

export const defineAttr = <T = void>(
  attributeLabel: string
): IAttributeType<T> => ({
  attributeLabel
})

export const required = (
  attributeType: IAttributeType<Any>,
  exactQuantity: number = 1
): IAttributeConstraint => ({
  attributeType,
  exactQuantity
})
