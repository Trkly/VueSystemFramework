module.exports = {
  // 可选类型
  types: [
    { value: "feat", name: "特性:   🚀  新增功能", emoji: "🚀" },
    { value: "fix", name: "修复:   🧩  修复缺陷", emoji: "🧩" },
    { value: "docs", name: "文档:   📚  文档变更", emoji: "📚" },
    { value: "style", name: "格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" },
    { value: "refactor", name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: "♻️" },
    { value: "perf", name: "性能:    ⚡️  性能优化", emoji: "⚡️" },
    { value: "test", name: "测试:   ✅  添加疏漏测试或已有测试改动", emoji: "✅" },
    { value: "build", name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）", emoji: "📦️" },
    { value: "ci", name: "集成:   🎡  修改 CI 配置、脚本", emoji: "🎡" },
    { value: "revert", name: "回退:   ⏪️  回滚 commit", emoji: "⏪️" },
    { value: "chore", name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: "🔨" },
    { value: "wip", name: "开发:   🕔  正在开发中", emoji: "🕔" },
    { value: "workflow", name: "工作流:   📋  工作流程改进", emoji: "📋" },
    { value: "types", name: "类型:   🔰  类型定义文件修改", emoji: "🔰" }
  ],

  // 消息步骤
  messages: {
    type: '请选择提交类型',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(可选):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭issue(可选):',
    confirmCommit: '确认使用以上信息提交?(y/n)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72
}
