'use client';

import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    folderId: string;
  };
}

export default function FolderPage({ params }: PageProps) {
  const router = useRouter();
  const folderId = params.folderId;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">文件夹 ID: {folderId}</h1>
      <p className="mt-4 text-gray-700">未来你可以在这里显示该文件夹下的资源内容。</p>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-6"
        onClick={() => router.push(`/dashboard/resources/${folderId}/upload`)}
      >
        添加文件
      </button>
    </div>
  );
}