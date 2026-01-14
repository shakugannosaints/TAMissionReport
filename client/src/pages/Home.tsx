import React, { useState, useRef } from 'react';
import TriangleAgencyLogo from '../../../assets/TriangleAgency.png';
import 已中和 from '../../../assets/已中和.png';
import 已捕获 from '../../../assets/已捕获.png';
import 已逃脱 from '../../../assets/已逃脱.png';
import MVP from '../../../assets/MVP.png';
import 察看期 from '../../../assets/察看期.png';
import 参与者 from '../../../assets/参与者.png';

export default function Home() {
  const [formData, setFormData] = useState({
    status: [] as string[],
    otherStatus: '',
    abnormalCode: '',
    abnormalBehavior: '',
    abnormalFocus: '',
    abnormalDomain: '',
    items: [{ name: '', quantity: '', note: '' }, { name: '', quantity: '', note: '' }, { name: '', quantity: '', note: '' }, { name: '', quantity: '', note: '' }, { name: '', quantity: '', note: '' }],
    objectives: [{ target: '', reward: '', specialist: '' }, { target: '', reward: '', specialist: '' }],
    mvp: '',
    observationPeriod: '',
    participants: '',
    finalRating: '',
    chaosPool: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = (status: string) => {
    setFormData(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const updateItem = (idx: number, field: string, value: string) => {
    const newItems = [...formData.items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const updateObjective = (idx: number, field: string, value: string) => {
    const newObjs = [...formData.objectives];
    newObjs[idx] = { ...newObjs[idx], [field]: value };
    setFormData({ ...formData, objectives: newObjs });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: '', note: '' }]
    }));
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, { target: '', reward: '', specialist: '' }]
    }));
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `任务报告_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setFormData(json);
        alert('导入成功！');
      } catch (error) {
        alert('导入失败：JSON格式错误');
      }
    };
    reader.readAsText(file);
    
    // 重置input以允许重复导入同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-white p-10" style={{ fontFamily: '"Noto Sans SC", "Microsoft YaHei", sans-serif' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-start gap-8">
          {/* A1 Badge */}
          <div className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-3xl w-24 h-24 flex items-center justify-center" style={{ borderRadius: '12px 12px 0 12px' }}>
            A1
          </div>
          
          {/* Title Section */}
          <div>
            <h1 className="text-5xl font-bold text-blue-900 mb-2" style={{ letterSpacing: '0.05em' }}>任务报告</h1>
            <p className="text-gray-600 text-base font-medium">异常状态</p>
          </div>
        </div>

        {/* Logo */}
        <div className="text-right">
          <img src={TriangleAgencyLogo} alt="Triangle Agency" className="h-25" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-10">
          {/* 异常状态 Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">异常状态</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Status Card 1 */}
              <div className="border-2 border-gray-300 rounded-3xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={已中和} alt="已中和" className="w-24 h-20 object-left object-contain" />
                    <div>
                      <div className="font-bold text-blue-900 text-lg">已中和</div>
                      <div className="text-xs text-gray-600 mt-1">不影响绩效指标</div>
                    </div>
                  </div>
                  <input type="checkbox" className="w-6 h-6 cursor-pointer" checked={formData.status.includes('已中和')} onChange={(e) => handleStatusChange('已中和')} />
                </div>
              </div>

              {/* Status Card 2 */}
              <div className="border-2 border-gray-300 rounded-3xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={已捕获} alt="已捕获" className="w-24 h-20 object-left object-contain" />
                    <div>
                      <div className="font-bold text-blue-900 text-lg">已捕获</div>
                      <div className="text-xs text-gray-600 mt-1">每名特工+3嘉奖</div>
                    </div>
                  </div>
                  <input type="checkbox" className="w-6 h-6 cursor-pointer" checked={formData.status.includes('已捕获')} onChange={(e) => handleStatusChange('已捕获')} />
                </div>
              </div>

              {/* Status Card 3 */}
              <div className="border-2 border-gray-300 rounded-3xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={已逃脱} alt="已逃脱" className="w-24 h-20 object-left object-contain" />
                    <div>
                      <div className="font-bold text-blue-900 text-lg">已逃脱</div>
                      <div className="text-xs text-gray-600 mt-1">每名特工+3申诫</div>
                    </div>
                  </div>
                  <input type="checkbox" className="w-6 h-6 cursor-pointer" checked={formData.status.includes('已逃脱')} onChange={(e) => handleStatusChange('已逃脱')} />
                </div>
              </div>

              {/* Status Card 4 */}
              <div className="border-2 border-gray-300 rounded-3xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-bold text-gray-700 mb-3 text-base">其他：</div>
                    <input type="text" placeholder="请输入" className="border-2 border-gray-300 px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-blue-400" value={formData.otherStatus} onChange={(e) => setFormData({...formData, otherStatus: e.target.value})} />
                  </div>
                  <input type="checkbox" className="w-6 h-6 cursor-pointer flex-shrink-0 mt-6" checked={formData.status.includes('其他')} onChange={(e) => handleStatusChange('其他')} />
                </div>
              </div>
            </div>
          </div>

          {/* 异常分析 Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">异常分析</h2>
            <div className="border-2 border-gray-300 rounded-3xl p-8">
              <div className="space-y-0">
                <div className="grid grid-cols-2 gap-6 pb-6 border-b-2 border-gray-200">
                  <div className="bg-gray-100 px-6 py-4 font-bold text-gray-700 rounded-lg">代号</div>
                  <input type="text" className="border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400" value={formData.abnormalCode} onChange={(e) => setFormData({...formData, abnormalCode: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6 py-6 border-b-2 border-gray-200">
                  <div className="bg-gray-100 px-6 py-4 font-bold text-gray-700 rounded-lg">行为</div>
                  <input type="text" className="border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400" value={formData.abnormalBehavior} onChange={(e) => setFormData({...formData, abnormalBehavior: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6 py-6 border-b-2 border-gray-200">
                  <div className="bg-gray-100 px-6 py-4 font-bold text-gray-700 rounded-lg">焦点</div>
                  <input type="text" className="border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400" value={formData.abnormalFocus} onChange={(e) => setFormData({...formData, abnormalFocus: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="bg-gray-100 px-6 py-4 font-bold text-gray-700 rounded-lg">领域</div>
                  <input type="text" className="border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400" value={formData.abnormalDomain} onChange={(e) => setFormData({...formData, abnormalDomain: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          {/* 散选端 Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">散选端</h2>
            <div className="border-2 border-gray-300 rounded-3xl p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left font-bold text-gray-700 border-r-2 border-gray-300 rounded-tl-lg">姓名</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 border-r-2 border-gray-300">数量</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 rounded-tr-lg">备注</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, idx) => (
                    <tr key={idx} className="border-b-2 border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 border-r-2 border-gray-300">
                        <input type="text" className="border-2 border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-400 text-sm" value={item.name} onChange={(e) => updateItem(idx, 'name', e.target.value)} />
                      </td>
                      <td className="px-6 py-4 border-r-2 border-gray-300">
                        <input type="text" className="border-2 border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-400 text-sm" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', e.target.value)} />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" className="border-2 border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-400 text-sm" value={item.note} onChange={(e) => updateItem(idx, 'note', e.target.value)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addItem} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">+ 添加行</button>
            </div>
          </div>

          {/* 可选目标 Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">可选目标</h2>
            <div className="border-2 border-gray-300 rounded-3xl p-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left font-bold text-gray-700 border-r-2 border-gray-300 rounded-tl-lg">目标</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 border-r-2 border-gray-300">奖励</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 rounded-tr-lg">按特工</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.objectives.map((obj, idx) => (
                    <tr key={idx} className="border-b-2 border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 border-r-2 border-gray-300">
                        <input type="text" className="border-2 border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-400 text-sm" value={obj.target} onChange={(e) => updateObjective(idx, 'target', e.target.value)} />
                      </td>
                      <td className="px-6 py-4 border-r-2 border-gray-300">
                        <input type="text" className="border-2 border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-400 text-sm" value={obj.reward} onChange={(e) => updateObjective(idx, 'reward', e.target.value)} />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" className="border-2 border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:border-blue-400 text-sm" value={obj.specialist} onChange={(e) => updateObjective(idx, 'specialist', e.target.value)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addObjective} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">+ 添加行</button>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="text-xs text-gray-600 space-y-2 pt-4">
            <p>一份完成的任务报告可为团队中的每名成员赢得 3 点嘉奖。</p>
            <p>一份详尽的任务报告可为团队中的每名成员赢得 6 点嘉奖。</p>
          </div>
        </div>

        {/* Right Column - Status Cards */}
        <div className="col-span-1 space-y-6">
          {/* 最终评级 */}
          <div className="border-2 border-gray-300 rounded-3xl p-8 bg-red-50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-gray-600 mb-2">仅供GM使用</div>
                <div className="text-2xl font-bold text-red-600 leading-tight">最终</div>
                <div className="text-2xl font-bold text-red-600 leading-tight">评级</div>
              </div>
              <div className="text-5xl">⭐</div>
            </div>
            <input type="text" className="w-full h-20 border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" value={formData.finalRating} onChange={(e) => setFormData({...formData, finalRating: e.target.value})} />
          </div>

          {/* 混沌池 */}
          <div className="border-2 border-gray-300 rounded-3xl p-8 bg-blue-50 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-blue-600">混沌池</div>
              <div className="text-5xl">🌀</div>
            </div>
            <input type="text" className="w-full h-20 border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" value={formData.chaosPool} onChange={(e) => setFormData({...formData, chaosPool: e.target.value})} />
          </div>

          {/* 评优 Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">评优</h3>
            
            {/* MVP */}
            <div className="border-2 border-gray-300 rounded-3xl p-8 bg-red-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-red-600">MVP</div>
                <img src={MVP} alt="MVP" className="w-24 h-20" />
              </div>
              <input type="text" className="w-full h-24 border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" value={formData.mvp} onChange={(e) => setFormData({...formData, mvp: e.target.value})} />
            </div>

            {/* 察看期 */}
            <div className="border-2 border-gray-300 rounded-3xl p-8 bg-gray-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-700">察看期</div>
                <img src={察看期} alt="察看期" className="w-24 h-20" />
              </div>
              <input type="text" className="w-full h-24 border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" value={formData.observationPeriod} onChange={(e) => setFormData({...formData, observationPeriod: e.target.value})} />
            </div>

            {/* 参与者 */}
            <div className="border-2 border-gray-300 rounded-3xl p-8 bg-gray-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-bold text-gray-700">参与者</div>
                <img src={参与者} alt="参与者" className="w-24 h-20" />
              </div>
              <input type="text" className="w-full h-28 border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" value={formData.participants} onChange={(e) => setFormData({...formData, participants: e.target.value})} />
            </div>
          </div>
        </div>
      </div>

      {/* 导入/导出按钮 - 固定在右下角 */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <button
          onClick={handleExportJSON}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
          title="导出JSON"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          导出JSON
        </button>
        <button
          onClick={triggerImport}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
          title="导入JSON"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          导入JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          className="hidden"
        />
      </div>
    </div>
  );
}
