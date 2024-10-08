/**
 * 检测是否纯数组类型
 * @param obj
 */
export function isArray(obj: any) {
  if (!obj) {
    return false;
  }
  return /Array/.test(Object.prototype.toString.call(obj));
}

/**
 * 检测是否函数
 * @param obj
 */
export function isFunction(obj: any) {
  if (!obj) {
    return false;
  }
  return /Function/.test(Object.prototype.toString.call(obj));
}

/**
 * 是否为空
 */
export function isEmpy(val: any) {
  return val === undefined || val === null;
}
