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
  itemTypes?: IItemType[]
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
      })
    } else {
      errors.push(`${context}${item.type.itemLabel}#* attributes not allowed`)
    }
  }

  if (item.items !== undefined && item.items.length > 0) {
    const { itemTypes } = item.type

    if (itemTypes !== undefined) {
      item.items.forEach(subItem => {
        if (itemTypes.indexOf(subItem.type) === -1) {
          errors.push(
            `${context}${item.type.itemLabel}.${
              subItem.type.itemLabel
            } item not allowed`
          )
        } else {
          errors.push.apply(
            errors,
            _validate(subItem, `${item.type.itemLabel}.`)
          )
        }
      })
    } else {
      errors.push(`${context}${item.type.itemLabel}.* items not allowed`)
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

export const getAttribute = <T>(
  item: IItem,
  attributeType: IAttributeType<T>
) =>
  item === undefined || item.attributes === undefined
    ? undefined
    : item.attributes.find(attribute => attribute.type === attributeType)

export const getItem = <T>(item: IItem, itemType: IItemType) =>
  item.items === undefined
    ? undefined
    : item.items.find(item => item.type === itemType)

export const attribute = <T>(type: IAttributeType<T>, value: T) => ({
  type,
  value
})

export const item = (
  type: IItemType,
  attributes: IAttribute<Any>[] = [],
  items: IItem[] = []
): IItem => ({
  type,
  attributes,
  items
})
