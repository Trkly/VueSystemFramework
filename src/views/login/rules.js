export const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}
