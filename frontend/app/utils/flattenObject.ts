export function flattenObject(
  obj: Record<string, any>,
  parentKey = "",
  result: Record<string, any> = {}
) {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key
    const value = obj[key]

    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenObject(value, newKey, result)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        flattenObject(item, `${newKey}.${index}`, result)
      })
    } else {
      result[newKey] = value
    }
  }

  return result
}
