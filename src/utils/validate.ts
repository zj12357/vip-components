/**
 * @description: 正则校验 ;
 * @param {string} str
 * @return {*}
 *
 */

//网址
export const isWebURL =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;

//24小时制时间
export const is24Hours = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

//12小时制时间
export const is12Hours = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;

//base64格式
export const isBase64 =
    /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;

//数字/货币金额（支持负数、千分位分隔符）
export const isAmount =
    /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;

//银行卡号
export const isBankCard =
    /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;

//中文姓名
export const isChineseName = /^(?:[\u4e00-\u9fa5·]{2,16})$/;

//英文姓名
export const isEnglishName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;

//手机号
export const isPhoneNumber = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;

//邮箱
export const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//身份证号, 支持1/2代(15位/18位数字)
export const idNumber =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

//小数
export const isDecimal = /^\d+\.\d+$/;

//负数
export const isNegativeNumber = /^(-)\d+(\.\d+)?$/;

//正数
export const isPositiveNumber = /^(\+)?\d+(\.\d+)?$/;

//数字和字母组成
export const isNumberLetter = /^[A-Za-z0-9]+$/;

//匹配连续重复的字符
export const isRepeat = /(.)\1+/;

//正整数，不包含0
export const isPositiveInteger = /^\+?[1-9]\d*$/;

//负整数，不包含0
export const isNegativeInteger = /^-[1-9]\d*$/;

//整数,数字
export const isInteger = /^[0-9]\d*$/;

//浮点数
export const isFloatingPointNumber = /^(-?\d+)(\.\d+)?$/;
