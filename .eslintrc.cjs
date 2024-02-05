module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 继承某些已有的规则
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
    'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们

    // vue (https://eslint.vuejs.org/rules)
    'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
    'vue/no-mutating-props': 'error', // 不允许改变组件 prop
    'vue/custom-event-name-casing': 'error', // 为自定义事件名称强制使用特定大小写
    'vue/html-closing-bracket-newline': 'error', // 在标签的右括号之前要求或禁止换行
    'vue/attribute-hyphenation': 'error', // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
    'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
    'vue/no-v-html': 'off', // 禁止使用 v-html
    'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/no-setup-props-destructure': 'off', // 禁止解构 props 传递给 setup
    'space-before-function-paren': 'off', // 函数名后面不允许有空格
    // 禁止出现未使用过的变量
    'no-unused-vars': 'off'
    // 'vue/no-unused-vars': 'error'
  }
}
