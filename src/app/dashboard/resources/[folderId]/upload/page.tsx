'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/utils/supabaseClient';

export default function UploadToFolderPage({
  params,
}: {
  params: { folderId: string };
}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const folderId = params.folderId;

  const handleUpload = async () => {
    if (!file) {
      setMessage('请选择文件');
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, file);

    if (uploadError) {
      setMessage(`上传失败：${uploadError.message}`);
      return;
    }

    const fileUrl = `https://eacujykpumefrklzbxje.supabase.co/storage/v1/object/public/files/${fileName}`;

    const { error: dbError } = await supabase.from('resources').insert([
      {
        title,
        description: desc,
        file_url: fileUrl,
        folder_id: folderId,
      },
    ]);

    if (dbError) {
      setMessage(`写入数据库失败：${dbError.message}`);
      return;
    }

    setMessage('上传成功，正在跳转...');
    setTimeout(() => {
      router.push(`/dashboard/resources/${folderId}`);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">上传文件到文件夹</h2>
      <input
        type="text"
        placeholder="标题"
        className="w-full border mb-3 px-3 py-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="描述"
        className="w-full border mb-3 px-3 py-2 rounded"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        上传
      </button>
      {message && (
        <p className="mt-4 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}