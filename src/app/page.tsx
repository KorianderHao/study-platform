export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* 导航栏 */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">StudyPlatform</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">资料中心</a>
          <a href="#" className="hover:underline">上传资料</a>
          <a href="#" className="hover:underline">关于我们</a>
          <button className="bg-blue-600 text-white px-4 py-1 rounded">登录</button>
        </nav>
      </header>

      {/* Hero 区域 */}
      <section className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-4">跨境学习资料共享平台</h2>
        <p className="text-lg mb-6">专为语言考试准备，真题例题一站式获取</p>
        <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded">开始浏览资料</a>
      </section>

      {/* 功能模块 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10">
        <FeatureBox title="浏览资料" desc="按考试、年份、语言快速查看资料" />
        <FeatureBox title="上传分享" desc="贡献你的真题，帮助其他学生" />
        <FeatureBox title="智能搜索" desc="快速找到你需要的题目" />
      </section>

      {/* 页脚 */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 StudyPlatform. All rights reserved.
      </footer>
    </main>
  );
}

// 子组件（可放在同一文件下）
function FeatureBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white p-6 shadow rounded hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}