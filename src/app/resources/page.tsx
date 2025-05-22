'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

type Resource = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('获取资料失败', error.message);
        return;
      }

      setResources(data || []);
    };

    fetchResources();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">最新上传的资料</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((item) => (
          <div key={item.id} className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <a
              href={item.file_url}
              target="_blank"
              className="text-blue-600 hover:underline text-sm"
            >
              查看文件
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}