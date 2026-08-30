'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderTree,
  Image as ImageIcon,
  Package,
  PlusCircle,
  Globe,
  Activity,
  Users,
  LogOut,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboardClient({ initialData }) {
  const [stats, setStats] = useState(initialData?.stats || {
    totalApks: 0,
    publishedApks: 0,
    draftApks: 0,
    totalCategories: 0,
    totalDownloads: 0,
    totalMedia: 0,
    totalAdmins: 0,
  });
  const [apks, setApks] = useState(initialData?.apks || []);
  const [categories, setCategories] = useState(initialData?.categories || []);
  const [mediaList, setMediaList] = useState(initialData?.mediaList || []);
  const [adminUsers, setAdminUsers] = useState(initialData?.adminUsers || []);
  const [activityLogs, setActivityLogs] = useState(initialData?.activityLogs || []);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catForm, setCatForm] = useState({ name: '', slug: '', description: '' });
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [adminForm, setAdminForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Editor',
    permissions: ['apks', 'media'],
  });
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [packageFilter, setPackageFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [versionFilter, setVersionFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [form, setForm] = useState({
    name: '', version: '', packageName: '', developer: 'VibeShort Inc.',
    category: '', apkSize: '50 MB', androidRequirement: 'Android 5.0+',
    appIcon: '', featuredImage: '', screenshots: '', shortDescription: '',
    fullDescription: '', features: '', whatsNew: '', downloadUrl: '',
    mirrorDownloadUrl: '', officialWebsite: '', lastUpdated: '', slug: '', status: 'draft',
    seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '',
    ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin');
      return;
    }

    try {
      const [statsRes, apksRes, catRes, mediaRes, usersRes, logsRes] = await Promise.all([
        fetch('/api/admin/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch('/api/admin/apks', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch('/api/admin/categories', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch('/api/admin/media', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch('/api/admin/activity-logs', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        }),
      ]);

      const statsData = await statsRes.json();
      const apksData = await apksRes.json();
      const catData = await catRes.json();
      const mediaData = await mediaRes.json();
      const usersData = await usersRes.json();
      const logsData = await logsRes.json();

      setStats(statsData);
      if (Array.isArray(apksData)) setApks(apksData);
      if (Array.isArray(catData)) setCategories(catData);
      if (Array.isArray(mediaData)) setMediaList(mediaData);
      if (Array.isArray(usersData)) setAdminUsers(usersData);
      if (Array.isArray(logsData)) setActivityLogs(logsData);
    } catch (error) {
      localStorage.removeItem('adminToken');
      router.replace('/admin');
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingAdminId ? `/api/admin/users/${editingAdminId}` : '/api/admin/users';
    const method = editingAdminId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adminForm),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setMessage(editingAdminId ? 'Admin user updated successfully!' : 'Admin user created successfully!');
      setEditingAdminId(null);
      setAdminForm({ username: '', email: '', password: '', role: 'Editor', permissions: ['apks'] });
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Are you sure you want to delete this admin user?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete admin');
      setMessage('Admin user deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleMediaUpload = async (e, type = 'general') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('mediaType', type);

    setUploadingMedia(true);
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setMessage('Images uploaded successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setUploadingMedia(false);
      e.target.value = '';
    }
  };

  const handleMediaReplace = async (e, mediaId) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Replace failed');

      setMessage('Image replaced successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
    e.target.value = '';
  };

  const handleDeleteMedia = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete media');
      setMessage('Image deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setMessage('Image URL copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    const url = editingId ? `/api/admin/apks/${editingId}` : '/api/admin/apks';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setMessage(editingId ? 'APK version and download links updated successfully!' : 'New APK version added successfully!');
      setEditingId(null);
      setForm({
        name: '', version: '', packageName: form.packageName, developer: 'VibeShort Inc.',
        category: categories[0]?.name || '', apkSize: '50 MB', androidRequirement: 'Android 5.0+',
        appIcon: '', featuredImage: '', screenshots: '', shortDescription: '',
        fullDescription: '', features: '', whatsNew: '', downloadUrl: '',
        mirrorDownloadUrl: '', officialWebsite: '', lastUpdated: '', slug: '', status: 'draft',
        seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '',
        ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: '',
      });

      fetchDashboardData();
      setActiveTab('apks');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingCatId ? `/api/admin/categories/${editingCatId}` : '/api/admin/categories';
    const method = editingCatId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(catForm),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setMessage(editingCatId ? 'Category updated successfully!' : 'Category added successfully!');
      setEditingCatId(null);
      setCatForm({ name: '', slug: '', description: '' });
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Category deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleEdit = (apk) => {
    setEditingId(apk._id);
    setForm({
      name: apk.name || '',
      version: apk.version || '',
      packageName: apk.packageName || '',
      developer: apk.developer || 'VibeShort Inc.',
      category: apk.category || categories[0]?.name || '',
      apkSize: apk.apkSize || '50 MB',
      androidRequirement: apk.androidRequirement || 'Android 5.0+',
      appIcon: apk.appIcon || '',
      featuredImage: apk.featuredImage || '',
      screenshots: apk.screenshots || '',
      shortDescription: apk.shortDescription || '',
      fullDescription: apk.fullDescription || '',
      features: apk.features || '',
      whatsNew: apk.whatsNew || '',
      downloadUrl: apk.downloadUrl || '',
      mirrorDownloadUrl: apk.mirrorDownloadUrl || '',
      officialWebsite: apk.officialWebsite || '',
      lastUpdated: apk.lastUpdated || '',
      slug: apk.slug || '',
      status: apk.status || 'draft',
      seoTitle: apk.seoTitle || '',
      metaDescription: apk.metaDescription || '',
      focusKeyword: apk.focusKeyword || '',
      canonicalUrl: apk.canonicalUrl || '',
      ogTitle: apk.ogTitle || '',
      ogDescription: apk.ogDescription || '',
      ogImage: apk.ogImage || '',
      robotsSettings: apk.robotsSettings || 'index, follow',
      schemaMarkup: apk.schemaMarkup || '',
    });
    setActiveTab('add-apk');
  };

  const handleAddVersion = (parentApk) => {
    setEditingId(null);
    setForm({
      name: parentApk.name || '',
      version: '',
      packageName: parentApk.packageName || '',
      developer: parentApk.developer || 'VibeShort Inc.',
      category: parentApk.category || categories[0]?.name || '',
      apkSize: parentApk.apkSize || '50 MB',
      androidRequirement: parentApk.androidRequirement || 'Android 5.0+',
      appIcon: parentApk.appIcon || '',
      featuredImage: parentApk.featuredImage || '',
      screenshots: parentApk.screenshots || '',
      shortDescription: parentApk.shortDescription || '',
      fullDescription: parentApk.fullDescription || '',
      features: parentApk.features || '',
      whatsNew: '',
      downloadUrl: '',
      mirrorDownloadUrl: '',
      officialWebsite: parentApk.officialWebsite || '',
      lastUpdated: '',
      slug: '',
      status: 'draft',
      seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '',
      ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: '',
    });
    setActiveTab('add-apk');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this APK version?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`/api/admin/apks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('APK version deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const filteredApksList = apks.filter((apk) => {
    const matchesName = apk.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPackage = apk.packageName?.toLowerCase().includes(packageFilter.toLowerCase());
    const matchesCategory = selectedCategory ? apk.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? apk.status === selectedStatus : true;
    const matchesVersion = versionFilter ? apk.version?.toLowerCase().includes(versionFilter.toLowerCase()) : true;
    const matchesDate = dateFilter ? apk.lastUpdated?.includes(dateFilter) : true;
    return matchesName && matchesPackage && matchesCategory && matchesStatus && matchesVersion && matchesDate;
  });

  const groupedApks = filteredApksList.reduce((acc, apk) => {
    const key = apk.packageName || 'unknown-package';
    if (!acc[key]) acc[key] = [];
    acc[key].push(apk);
    return acc;
  }, {});

  const filteredMedia = mediaList.filter((media) => {
    if (mediaTypeFilter === 'all') return true;
    return media.mediaType === mediaTypeFilter;
  });

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#121218] border-r border-white/10 p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-xl font-black text-[#B8F000]">VibeShort Admin</h2>
          <nav className="space-y-2 text-sm">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
            </button>
            <button onClick={() => setActiveTab('admin-users')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'admin-users' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <Users className="w-4 h-4" /> Admin Users
            </button>
            <button onClick={() => setActiveTab('categories')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'categories' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <FolderTree className="w-4 h-4" /> Categories Management
            </button>
            <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'media' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <ImageIcon className="w-4 h-4" /> Media Library
            </button>
            <button onClick={() => setActiveTab('apks')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'apks' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <Package className="w-4 h-4" /> APKs Version & Downloads
            </button>
            <button onClick={() => {
              setEditingId(null);
              setForm({
                name: '', version: '', packageName: '', developer: 'VibeShort Inc.',
                category: categories[0]?.name || '', apkSize: '50 MB', androidRequirement: 'Android 5.0+',
                appIcon: '', featuredImage: '', screenshots: '', shortDescription: '',
                fullDescription: '', features: '', whatsNew: '', downloadUrl: '',
                mirrorDownloadUrl: '', officialWebsite: '', lastUpdated: '', slug: '', status: 'draft',
                seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '',
                ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: '',
              });
              setActiveTab('add-apk');
            }} className="w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]">
              <PlusCircle className="w-4 h-4" /> Add New APK
            </button>
            <button onClick={() => setActiveTab('seo')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'seo' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <Globe className="w-4 h-4" /> SEO & Indexing
            </button>
            <button onClick={() => setActiveTab('activity')} className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${activeTab === 'activity' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'}`}>
              <Activity className="w-4 h-4" /> Activity Logs
            </button>
          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            router.push('/admin');
          }}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-300 rounded-xl font-semibold hover:bg-red-500/10 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {message && (
          <div className="mb-6 rounded-xl border border-[#B8F000]/20 bg-[#B8F000]/10 text-[#D9FF70] px-4 py-3 text-sm font-medium">
            {message}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: 'Total APKs', value: stats.totalApks, accent: 'bg-[#B8F000]' },
                { label: 'Published', value: stats.publishedApks, accent: 'bg-emerald-500' },
                { label: 'Drafts', value: stats.draftApks, accent: 'bg-amber-500' },
                { label: 'Downloads', value: stats.totalDownloads, accent: 'bg-cyan-500' },
              ].map((item) => (
                <div key={item.label} className="bg-[#121218] border border-white/10 rounded-2xl p-5">
                  <div className={`w-2 h-2 rounded-full mb-3 ${item.accent}`} />
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{item.label}</p>
                  <p className="text-3xl font-black mt-3 text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black text-white">Downloads Overview</h3>
                  <span className="text-xs text-gray-400">This Month</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={apks.slice(0, 6)}>
                      <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="downloadCount" fill="#B8F000" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
                <h3 className="text-lg font-black text-white mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400">Categories</span>
                    <span className="font-bold text-white">{stats.totalCategories}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400">Media Files</span>
                    <span className="font-bold text-white">{stats.totalMedia}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400">Admins</span>
                    <span className="font-bold text-white">{stats.totalAdmins}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Published Ratio</span>
                    <span className="font-bold text-[#B8F000]">
                      {stats.totalApks ? Math.round((stats.publishedApks / stats.totalApks) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin-users' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white">Admin Users</h3>
                <button onClick={() => {
                  setEditingAdminId(null);
                  setAdminForm({ username: '', email: '', password: '', role: 'Editor', permissions: ['apks'] });
                }} className="px-4 py-2 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer">Add Admin</button>
              </div>

              <form onSubmit={handleAdminSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Username" value={adminForm.username} onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input type="email" placeholder="Email" value={adminForm.email} onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input type="password" placeholder="Password" value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required={!editingAdminId} />
                <select value={adminForm.role} onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white">
                  <option value="Editor">Editor</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="px-5 py-3 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer">{editingAdminId ? 'Update Admin' : 'Create Admin'}</button>
                  {editingAdminId && (
                    <button type="button" onClick={() => { setEditingAdminId(null); setAdminForm({ username: '', email: '', password: '', role: 'Editor', permissions: ['apks'] }); }} className="px-5 py-3 rounded-xl border border-white/10 text-white font-bold text-sm cursor-pointer">Cancel</button>
                  )}
                </div>
              </form>

              <div className="space-y-3">
                {adminUsers.map((user) => (
                  <div key={user._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-white/10 rounded-xl p-4">
                    <div>
                      <p className="font-bold text-white">{user.username}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <p className="text-xs text-[#B8F000] mt-1">{user.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingAdminId(user._id); setAdminForm({ username: user.username, email: user.email, password: '', role: user.role, permissions: user.permissions || ['apks'] }); }} className="px-3 py-2 rounded-lg border border-white/10 text-white text-xs font-semibold cursor-pointer">Edit</button>
                      <button onClick={() => handleDeleteAdmin(user._id)} className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 text-xs font-semibold cursor-pointer">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
              <h3 className="text-lg font-black text-white mb-4">Categories</h3>
              <form onSubmit={handleCategorySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Category name" value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input type="text" placeholder="Slug" value={catForm.slug} onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <textarea value={catForm.description} onChange={(e) => setCatForm({ ...catForm, description: e.target.value })} placeholder="Description" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white h-28" />
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="px-5 py-3 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer">{editingCatId ? 'Update Category' : 'Add Category'}</button>
                  {editingCatId && (
                    <button type="button" onClick={() => { setEditingCatId(null); setCatForm({ name: '', slug: '', description: '' }); }} className="px-5 py-3 rounded-xl border border-white/10 text-white font-bold text-sm cursor-pointer">Cancel</button>
                  )}
                </div>
              </form>

              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center justify-between border border-white/10 rounded-xl p-4">
                    <div>
                      <p className="font-bold text-white">{category.name}</p>
                      <p className="text-xs text-gray-400">/{category.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingCatId(category._id); setCatForm({ name: category.name, slug: category.slug, description: category.description || '' }); }} className="px-3 py-2 rounded-lg border border-white/10 text-white text-xs font-semibold cursor-pointer">Edit</button>
                      <button onClick={() => handleDeleteCategory(category._id)} className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 text-xs font-semibold cursor-pointer">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
              <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                <h3 className="text-lg font-black text-white">Media Library</h3>
                <div className="flex items-center gap-2">
                  <select value={mediaTypeFilter} onChange={(e) => setMediaTypeFilter(e.target.value)} className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm">
                    <option value="all">All</option>
                    <option value="icon">Icons</option>
                    <option value="featured">Featured</option>
                    <option value="screenshot">Screenshots</option>
                    <option value="general">General</option>
                  </select>
                  <label className="px-4 py-2 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer">
                    Upload Media
                    <input type="file" multiple onChange={(e) => handleMediaUpload(e, 'general')} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMedia.map((media) => (
                  <div key={media._id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D12]">
                    <div className="h-52 overflow-hidden">
                      <img src={media.url} alt={media.filename || 'Media'} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-3 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8F000]">{media.mediaType}</span>
                        <span className="text-[10px] text-gray-400">{media.fileSize}</span>
                      </div>
                      <p className="text-sm text-white truncate">{media.filename}</p>
                      <div className="flex gap-2">
                        <button onClick={() => copyToClipboard(media.url)} className="flex-1 px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 font-semibold text-center cursor-pointer">Copy URL</button>
                        <label className="flex-1 px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-yellow-400 font-semibold text-center cursor-pointer">
                          Replace
                          <input type="file" className="hidden" onChange={(e) => handleMediaReplace(e, media._id)} />
                        </label>
                        <button onClick={() => handleDeleteMedia(media._id)} className="flex-1 px-2 py-2 rounded-lg bg-red-500/10 text-red-300 font-semibold cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apks' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
              <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                <h3 className="text-lg font-black text-white">APK Versions</h3>
                <button onClick={() => { setEditingId(null); setForm({ name: '', version: '', packageName: '', developer: 'VibeShort Inc.', category: categories[0]?.name || '', apkSize: '50 MB', androidRequirement: 'Android 5.0+', appIcon: '', featuredImage: '', screenshots: '', shortDescription: '', fullDescription: '', features: '', whatsNew: '', downloadUrl: '', mirrorDownloadUrl: '', officialWebsite: '', lastUpdated: '', slug: '', status: 'draft', seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: '' }); setActiveTab('add-apk'); }} className="px-4 py-2 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer">+ Add APK</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search name" className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm" />
                <input value={packageFilter} onChange={(e) => setPackageFilter(e.target.value)} placeholder="Package" className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm" />
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm">
                  <option value="">All Categories</option>
                  {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                </select>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm">
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="space-y-4">
                {Object.entries(groupedApks).map(([packageName, versions]) => (
                  <div key={packageName} className="border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-white">{packageName}</p>
                      <span className="text-xs text-[#B8F000]">{versions.length} versions</span>
                    </div>
                    <div className="space-y-3">
                      {versions.map((apk) => (
                        <div key={apk._id} className="flex flex-col md:flex-row md:items-center md:justify-between border border-white/10 rounded-xl p-3 gap-3">
                          <div>
                            <p className="font-semibold text-white">{apk.name} v{apk.version}</p>
                            <p className="text-xs text-gray-400">{apk.category} • {apk.status}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(apk)} className="px-3 py-2 rounded-lg border border-white/10 text-white text-xs font-semibold cursor-pointer">Edit</button>
                            <button onClick={() => handleAddVersion(apk)} className="px-3 py-2 rounded-lg border border-white/10 text-white text-xs font-semibold cursor-pointer">Add Version</button>
                            <button onClick={() => handleDelete(apk._id)} className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 text-xs font-semibold cursor-pointer">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-apk' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
              <h3 className="text-lg font-black text-white mb-4">{editingId ? 'Edit APK' : 'Add APK'}</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="App Name" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} placeholder="Version" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input value={form.packageName} onChange={(e) => setForm({ ...form, packageName: e.target.value })} placeholder="Package Name" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input value={form.developer} onChange={(e) => setForm({ ...form, developer: e.target.value })} placeholder="Developer" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white">
                  {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                </select>
                <input value={form.apkSize} onChange={(e) => setForm({ ...form, apkSize: e.target.value })} placeholder="APK Size" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.androidRequirement} onChange={(e) => setForm({ ...form, androidRequirement: e.target.value })} placeholder="Android Requirement" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.downloadUrl} onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })} placeholder="Download URL" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" required />
                <input value={form.mirrorDownloadUrl} onChange={(e) => setForm({ ...form, mirrorDownloadUrl: e.target.value })} placeholder="Mirror Download URL" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.officialWebsite} onChange={(e) => setForm({ ...form, officialWebsite: e.target.value })} placeholder="Official Website" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.appIcon} onChange={(e) => setForm({ ...form, appIcon: e.target.value })} placeholder="App Icon URL" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} placeholder="Featured Image URL" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <input value={form.screenshots} onChange={(e) => setForm({ ...form, screenshots: e.target.value })} placeholder="Screenshots" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} placeholder="Short Description" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white h-24" />
                <textarea value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} placeholder="Full Description" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white h-32" />
                <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Features" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white h-24" />
                <textarea value={form.whatsNew} onChange={(e) => setForm({ ...form, whatsNew: e.target.value })} placeholder="What's New" className="md:col-span-2 px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white h-24" />
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <input value={form.lastUpdated} onChange={(e) => setForm({ ...form, lastUpdated: e.target.value })} placeholder="Last Updated" className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white" />
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="px-5 py-3 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer">{editingId ? 'Update APK' : 'Save APK'}</button>
                  <button type="button" onClick={() => setActiveTab('apks')} className="px-5 py-3 rounded-xl border border-white/10 text-white font-bold text-sm cursor-pointer">Back to list</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-black text-white mb-2">SEO &amp; Indexing</h3>
              <p className="text-sm text-gray-400 mb-6">
                Per-APK SEO settings (title, meta description, Open Graph, canonical URL, robots, and schema
                markup) are configured inside the <strong className="text-white">Add / Edit APK</strong> form.
                Select any APK from the <em className="text-[#B8F000]">APKs</em> tab and click{' '}
                <em className="text-[#B8F000]">Edit</em> to manage its SEO fields.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  { label: 'SEO Title', desc: 'Custom browser tab title (falls back to app name).' },
                  { label: 'Meta Description', desc: 'Snippet shown in Google results (≤160 chars).' },
                  { label: 'Focus Keyword', desc: 'Primary keyword for this APK page.' },
                  { label: 'Canonical URL', desc: 'Prevents duplicate-content penalties.' },
                  { label: 'Open Graph', desc: 'Title, description, and image for social sharing.' },
                  { label: 'Robots Settings', desc: 'index/noindex, follow/nofollow per page.' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#0D0D12] border border-white/10 rounded-xl p-4">
                    <p className="font-bold text-[#B8F000] text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: '', version: '', packageName: '', developer: 'VibeShort Inc.',
                    category: categories[0]?.name || '', apkSize: '50 MB', androidRequirement: 'Android 5.0+',
                    appIcon: '', featuredImage: '', screenshots: '', shortDescription: '',
                    fullDescription: '', features: '', whatsNew: '', downloadUrl: '',
                    mirrorDownloadUrl: '', officialWebsite: '', lastUpdated: '', slug: '', status: 'draft',
                    seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '',
                    ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: '',
                  });
                  setActiveTab('add-apk');
                }}
                className="mt-6 px-5 py-3 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-sm cursor-pointer"
              >
                + Add New APK with SEO
              </button>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white">Activity Logs</h3>
                <span className="text-xs text-gray-400">{activityLogs.length} recent entries</span>
              </div>
              {activityLogs.length === 0 ? (
                <p className="text-sm text-gray-500 py-8 text-center">No activity recorded yet.</p>
              ) : (
                <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
                  {activityLogs.map((log) => (
                    <div
                      key={log._id}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#B8F000] uppercase tracking-wide">
                            {log.adminName}
                          </span>
                          <span className="text-gray-600 text-xs">·</span>
                          <span className="text-xs text-white font-semibold">{log.action}</span>
                        </div>
                        {log.details && (
                          <p className="text-xs text-gray-400 truncate">{log.details}</p>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap shrink-0">
                        {new Date(log.createdAt || log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
