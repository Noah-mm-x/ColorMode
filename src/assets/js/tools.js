/**
 * 数字前面补0
 * @param {String | Number} num 
 * @returns {String}
 */
export const doubleNum = (num) => {
  if (typeof num !== 'number') return
  return +num < 10 ? '0' + num : num
}
/**
 * 时间点
 * 时间格式化，将时间格式为 YYYY/MM/DD YYYY-MM-DD YYYY年MM月DD日
 * @param {Date} date 
 * @param {String} way 默认为空,YYYY年MM月DD日
 * @returns {String}
 */
export const dateFormat = (date, way = '') => {
  const time = new Date(date)
  if (!time) return date
  const year = time.getFullYear()
  const month = doubleNum(time.getMonth() + 1)
  const day = doubleNum(time.getDate())
  if (way == '') return `${year}年${month}月${day}日`
  else return `${year}${way}${month}${way}${day}`
}

/**
 * 时间段
 * 时间格式化，将时间格式为 YYYY/MM/DD YYYY-MM-DD YYYY年MM月DD日
 * @param {Date} startDate 开始时间
 * @param {Date} endDate 结束时间
 * @param {String} word  之间占位字
 * @param {String} way 默认为空,YYYY年MM月DD日
 * @returns {String}
 */
export const dateMulFormat = (startDate, endDate, word = '至', way = '') => {
  return `${dateFormat(startDate, way)}${word}${dateFormat(endDate, way)}`
}
/**
 * 返回距离当前时间 传入参数的时间戳
 * @param {String} disDay 距离天数支持负数
*/
export const dateDisTime = (disDay) => {
  let nowTime = new Date()
  let targeTime = nowTime.getTime() + disDay * 24 * 3600 * 1000
  return [dateFormat(nowTime, '-'), dateFormat(targeTime, '-')]
}