const _toString = Object.prototype.toString
function typeFactory(type: string) {
  return (value: any): boolean => {
    return _toString.call(value) === `[object ${type}]`
  }
}

export function isNumber(value: any) {
  return typeFactory('Number')(value)
}

export function isString(value: any) {
  return typeFactory('String')(value)
}

export function isBoolean(value: any) {
  typeFactory('Boolean')(value)
}

export function isNull(value: any) {
  typeFactory('Null')(value)
}

export function isSymbol(value: any) {
  typeFactory('Symbol')(value)
}

export function isFunction(value: any) {
  typeFactory('Function')(value)
}

export function isObject(value: any) {
  typeFactory('Object')(value)
}

export function isArray(value: any) {
  typeFactory('Array')(value)
}
