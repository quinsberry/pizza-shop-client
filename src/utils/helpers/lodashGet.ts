// ** The same function as a lodash _.get() but return only a numbers **
// ***************
const _get = (obj: any, path: string) => {
  const [firstKey, ...keys] = path.split('.')
  return keys.reduce((val, key) => val[key], obj[firstKey])
}

export default (obj: any, path: string) => {
  return Object.values(obj).reduce((init: number, obj) => {
    const value = _get(obj, path)
    return init + Number(value)
  }, 0)
}
