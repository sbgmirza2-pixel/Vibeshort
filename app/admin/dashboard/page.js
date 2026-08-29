'use client';
import { useState, useEffect } from 'react';
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
  LogOut 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalApks: 0,
    publishedApks: 0,
    draftApks: 0,
    totalCategories: 0,
    totalDownloads: 0,
    totalMedia: 0,
    totalAdmins: 0
  });
  const [apks, setApks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);
  
  const [editingCatId, setEditingCatId] = useState(null);
  const [catForm, setCatForm] = useState({ name: '', slug: '', description: '' });

  // Admin Users Form State
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [adminForm, setAdminForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Editor',
    permissions: ['apks', 'media']
  });

  // Media Upload State
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all');

  // Search & Filter States
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
    ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: ''
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    try {
      const statsRes = await fetch('http://localhost:5000/api/admin/dashboard-stats', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const statsData = await statsRes.json();
      setStats(statsData);

      const apksRes = await fetch('http://localhost:5000/api/admin/apks', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const apksData = await apksRes.json();
      if (Array.isArray(apksData)) setApks(apksData);

      const catRes = await fetch('http://localhost:5000/api/admin/categories', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const catData = await catRes.json();
      if (Array.isArray(catData)) setCategories(catData);

      const mediaRes = await fetch('http://localhost:5000/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const mediaData = await mediaRes.json();
      if (Array.isArray(mediaData)) setMediaList(mediaData);

      const usersRes = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const usersData = await usersRes.json();
      if (Array.isArray(usersData)) setAdminUsers(usersData);

      setLoading(false);
    } catch {
      localStorage.removeItem('adminToken');
      router.replace('/admin/login');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [router]);

  // Admin User Submission Handler
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingAdminId 
      ? `http://localhost:5000/api/admin/users/edit/${editingAdminId}`
      : 'http://localhost:5000/api/admin/users/add';
    const method = editingAdminId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(adminForm),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

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
      const res = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
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
      const res = await fetch('http://localhost:5000/api/admin/media/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

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
      const res = await fetch(`http://localhost:5000/api/admin/media/replace/${mediaId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

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
      const res = await fetch(`http://localhost:5000/api/admin/media/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
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
    const url = editingId 
      ? `http://localhost:5000/api/admin/apk/edit/${editingId}`
      : 'http://localhost:5000/api/admin/apk/add';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage(editingId ? 'APK version and download links updated successfully!' : 'New APK version added successfully!');
      setEditingId(null);
      setForm({
        name: '', version: '', packageName: form.packageName, developer: 'VibeShort Inc.',
        category: categories[0]?.name || '', apkSize: '50 MB', androidRequirement: 'Android 5.0+',
        appIcon: '', featuredImage: '', screenshots: '', shortDescription: '',
        fullDescription: '', features: '', whatsNew: '', downloadUrl: '',
        mirrorDownloadUrl: '', officialWebsite: '', lastUpdated: '', slug: '', status: 'draft',
        seoTitle: '', metaDescription: '', focusKeyword: '', canonicalUrl: '',
        ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: ''
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
    const url = editingCatId 
      ? `http://localhost:5000/api/admin/category/edit/${editingCatId}`
      : 'http://localhost:5000/api/admin/category/add';
    const method = editingCatId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(catForm),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

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
      const res = await fetch(`http://localhost:5000/api/admin/category/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
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
      schemaMarkup: apk.schemaMarkup || ''
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
      ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: ''
    });
    setActiveTab('add-apk');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this APK version?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch(`http://localhost:5000/api/admin/apk/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('APK version deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const filteredApksList = apks.filter(apk => {
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

  const filteredMedia = mediaList.filter(media => {
    if (mediaTypeFilter === 'all') return true;
    return media.mediaType === mediaTypeFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center text-white">
        <p className="text-sm font-medium animate-pulse text-[#B8F000]">Verifying secure session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#121218] border-r border-white/10 p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-xl font-black text-[#B8F000]">VibeShort Admin</h2>
          <nav className="space-y-2 text-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('admin-users')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'admin-users' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <Users className="w-4 h-4" />
              Admin Users
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'categories' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              Categories Management
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'media' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Media Library
            </button>
            <button
              onClick={() => setActiveTab('apks')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'apks' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <Package className="w-4 h-4" />
              APKs Version & Downloads
            </button>
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
                  ogTitle: '', ogDescription: '', ogImage: '', robotsSettings: 'index, follow', schemaMarkup: ''
                });
                setActiveTab('add-apk');
              }}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'add-apk' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              + Add New APK
            </button>
            <button
              onClick={() => setActiveTab('seo-settings')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'seo-settings' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <Globe className="w-4 h-4" />
              SEO Settings Tab
            </button>
            <button
              onClick={() => setActiveTab('activity-log')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl font-bold transition-all border cursor-pointer ${
                activeTab === 'activity-log' ? 'bg-[#B8F000]/10 border-[#B8F000] text-[#B8F000]' : 'bg-transparent border-white/10 text-gray-300 hover:border-[#B8F000]/50 hover:text-[#B8F000]'
              }`}
            >
              <Activity className="w-4 h-4" />
              Activity Log
            </button>
          </nav>
        </div>

        <div>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.replace('/admin/login');
            }}
            className="w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:border-red-500/60 hover:bg-red-500/5 transition font-medium cursor-pointer text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold capitalize flex items-center gap-3">
          {activeTab === 'dashboard' && <><LayoutDashboard className="w-8 h-8 text-[#B8F000]" /> Dashboard Overview</>}
          {activeTab === 'admin-users' && <><Users className="w-8 h-8 text-[#B8F000]" /> Admin Users Management</>}
          {activeTab === 'categories' && <><FolderTree className="w-8 h-8 text-[#B8F000]" /> Manage Categories</>}
          {activeTab === 'media' && <><ImageIcon className="w-8 h-8 text-[#B8F000]" /> Media Library Management</>}
          {activeTab === 'apks' && <><Package className="w-8 h-8 text-[#B8F000]" /> APKs Version & Download Management</>}
          {activeTab === 'add-apk' && <><PlusCircle className="w-8 h-8 text-[#B8F000]" /> {editingId ? 'Edit APK & Download Links' : 'Add New APK & Download Links'}</>}
          {activeTab === 'seo-settings' && <><Globe className="w-8 h-8 text-[#B8F000]" /> Global Search Engine Optimization (SEO)</>}
          {activeTab === 'activity-log' && <><Activity className="w-8 h-8 text-[#B8F000]" /> System Activity Log</>}
        </h1>

        {message && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-[#B8F000]">
            {message}
          </div>
        )}

        {/* TAB 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-[#121218] p-5 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs text-gray-400 font-medium">Total APKs</p>
                <p className="text-2xl font-black text-white">{stats.totalApks}</p>
              </div>
              <div className="bg-[#121218] p-5 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs text-gray-400 font-medium">Published</p>
                <p className="text-2xl font-black text-green-400">{stats.publishedApks}</p>
              </div>
              <div className="bg-[#121218] p-5 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs text-gray-400 font-medium">Drafts</p>
                <p className="text-2xl font-black text-amber-400">{stats.draftApks}</p>
              </div>
              <div className="bg-[#121218] p-5 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs text-gray-400 font-medium">Categories</p>
                <p className="text-2xl font-black text-[#B8F000]">{stats.totalCategories}</p>
              </div>
              <div className="bg-[#121218] p-5 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs text-gray-400 font-medium">Admin Users</p>
                <p className="text-2xl font-black text-purple-400">{stats.totalAdmins || 1}</p>
              </div>
              <div className="bg-[#121218] p-5 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs text-gray-400 font-medium">Total Downloads</p>
                <p className="text-2xl font-black text-cyan-400">{stats.totalDownloads || 0}</p>
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-4">
                <h2 className="text-base font-bold text-white">APK Status Metrics</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Total APKs', count: stats.totalApks, fill: '#ffffff' },
                      { name: 'Published', count: stats.publishedApks, fill: '#4ade80' },
                      { name: 'Drafts', count: stats.draftApks, fill: '#fbbf24' },
                      { name: 'Categories', count: stats.totalCategories, fill: '#B8F000' }
                    ]}>
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#0D0D12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Platform Activity Summary</h2>
                  <p className="text-xs text-gray-400 mt-1">Real-time overview of system metrics and administrative access counts.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="bg-[#0D0D12] p-4 rounded-xl border border-white/5 space-y-1">
                    <p className="text-xs text-gray-400">Published Ratio</p>
                    <p className="text-xl font-black text-green-400">
                      {stats.totalApks > 0 ? Math.round((stats.publishedApks / stats.totalApks) * 100) : 0}%
                    </p>
                  </div>
                  <div className="bg-[#0D0D12] p-4 rounded-xl border border-white/5 space-y-1">
                    <p className="text-xs text-gray-400">Active Admins</p>
                    <p className="text-xl font-black text-purple-400">{adminUsers.length}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('add-apk')} className="px-5 py-2.5 rounded-xl bg-[#B8F000] text-[#0D0D12] font-bold text-xs cursor-pointer">
                    + Upload New APK & Links
                  </button>
                  <button onClick={() => setActiveTab('admin-users')} className="px-5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs hover:bg-purple-500/20 cursor-pointer">
                    Manage Admin Users
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Admin Users Management (NEW) */}
        {activeTab === 'admin-users' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">{editingAdminId ? 'Edit Admin User' : 'Add New Admin User'}</h2>
                <p className="text-xs text-gray-400">Configure credentials, roles, and granular permission permissions for collaborators.</p>
              </div>
              {editingAdminId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAdminId(null);
                    setAdminForm({ username: '', email: '', password: '', role: 'Editor', permissions: ['apks'] });
                  }}
                  className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <input 
                  type="text" 
                  placeholder="Username *" 
                  value={adminForm.username} 
                  onChange={e => setAdminForm({...adminForm, username: e.target.value})} 
                  required 
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  value={adminForm.email} 
                  onChange={e => setAdminForm({...adminForm, email: e.target.value})} 
                  required 
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" 
                />
                <input 
                  type="password" 
                  placeholder={editingAdminId ? 'New Password (leave blank to keep current)' : 'Password *'} 
                  value={adminForm.password} 
                  onChange={e => setAdminForm({...adminForm, password: e.target.value})} 
                  {...(!editingAdminId ? { required: true } : {})}
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" 
                />
                
                <select 
                  value={adminForm.role} 
                  onChange={e => setAdminForm({...adminForm, role: e.target.value})} 
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]"
                >
                  <option value="Super Admin">Role: Super Admin</option>
                  <option value="Editor">Role: Editor</option>
                  <option value="Moderator">Role: Moderator</option>
                </select>

                <div className="md:col-span-2 flex flex-wrap items-center gap-4 px-4 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-xs">
                  <span className="text-gray-400 font-semibold">Permissions:</span>
                  {['apks', 'media', 'categories', 'users', 'seo'].map(perm => (
                    <label key={perm} className="flex items-center gap-1.5 cursor-pointer text-white capitalize">
                      <input 
                        type="checkbox" 
                        checked={adminForm.permissions.includes(perm)}
                        onChange={e => {
                          const currentPerms = adminForm.permissions;
                          if (e.target.checked) {
                            setAdminForm({...adminForm, permissions: [...currentPerms, perm]});
                          } else {
                            setAdminForm({...adminForm, permissions: currentPerms.filter(p => p !== perm)});
                          }
                        }}
                        className="accent-[#B8F000]"
                      />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="px-6 py-3 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm cursor-pointer">
                {editingAdminId ? 'Update Admin User' : 'Create Admin Account'}
              </button>
            </form>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <h3 className="text-base font-bold text-white">Existing Administrative Accounts</h3>
              <div className="divide-y divide-white/5">
                {adminUsers.length === 0 ? (
                  <p className="text-gray-400 text-sm py-2">No admin users found.</p>
                ) : (
                  adminUsers.map(adm => (
                    <div key={adm._id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm">
                      <div>
                        <p className="font-bold text-white">{adm.username} <span className="text-xs text-[#B8F000] font-normal">({adm.email})</span></p>
                        <p className="text-xs text-gray-400">Role: <span className="text-purple-400 font-semibold">{adm.role}</span> • Permissions: {adm.permissions?.join(', ') || 'None'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditingAdminId(adm._id);
                            setAdminForm({ username: adm.username, email: adm.email, password: '', role: adm.role, permissions: adm.permissions || [] });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-blue-400 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteAdmin(adm._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white">{editingCatId ? 'Edit Category' : 'Add New Category'}</h2>
            
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <input type="text" placeholder="Category Name *" value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
                <input type="text" placeholder="Category Slug *" value={catForm.slug} onChange={e => setCatForm({...catForm, slug: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              </div>
              <textarea placeholder="Category Description" value={catForm.description} onChange={e => setCatForm({...catForm, description: e.target.value})} rows={2} className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#B8F000]" />
              <div className="flex gap-3">
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm cursor-pointer">
                  {editingCatId ? 'Update Category' : 'Save Category'}
                </button>
                {editingCatId && (
                  <button type="button" onClick={() => { setEditingCatId(null); setCatForm({ name: '', slug: '', description: '' }); }} className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white text-sm cursor-pointer">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <h3 className="text-base font-bold text-white">Existing Categories</h3>
              <div className="divide-y divide-white/5">
                {categories.map(cat => (
                  <div key={cat._id} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-white">{cat.name} <span className="text-xs text-[#B8F000] font-normal">({cat.slug})</span></p>
                      <p className="text-xs text-gray-400">{cat.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingCatId(cat._id); setCatForm({ name: cat.name, slug: cat.slug, description: cat.description }); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-blue-400 cursor-pointer">Edit</button>
                      <button onClick={() => handleDeleteCategory(cat._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 cursor-pointer">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Media Library Management */}
        {activeTab === 'media' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Media Manager</h2>
                <p className="text-xs text-gray-400">Upload, replace, delete or copy URLs for app icons, screenshots & featured images.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select value={mediaTypeFilter} onChange={e => setMediaTypeFilter(e.target.value)} className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-xs text-white focus:outline-none">
                  <option value="all">All Types</option>
                  <option value="icon">App Icons</option>
                  <option value="featured">Featured Images</option>
                  <option value="screenshot">Screenshots</option>
                  <option value="general">General</option>
                </select>

                <label className="px-4 py-2 rounded-xl bg-[#B8F000] text-[#0D0D12] text-xs font-bold cursor-pointer hover:bg-[#D0F000] transition flex items-center gap-2">
                  {uploadingMedia ? 'Uploading...' : '+ Upload Images'}
                  <input type="file" multiple accept="image/*" onChange={e => handleMediaUpload(e, 'general')} className="hidden" disabled={uploadingMedia} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
              {filteredMedia.map(media => (
                <div key={media._id} className="bg-[#0D0D12] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group">
                  <div className="relative h-32 bg-black/40 flex items-center justify-center overflow-hidden">
                    <img src={media.url} alt={media.filename || 'Media'} className="object-cover w-full h-full group-hover:scale-105 transition" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-[10px] font-bold uppercase text-[#B8F000]">
                      {media.mediaType || 'general'}
                    </span>
                  </div>

                  <div className="p-3 space-y-2">
                    <p className="text-xs font-medium truncate text-gray-300">{media.filename || 'image.png'}</p>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <button onClick={() => copyToClipboard(media.url)} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 font-semibold text-center cursor-pointer">Copy URL</button>
                      <label className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 font-semibold text-center cursor-pointer">
                        Replace
                        <input type="file" accept="image/*" onChange={e => handleMediaReplace(e, media._id)} className="hidden" />
                      </label>
                    </div>
                    <button onClick={() => handleDeleteMedia(media._id)} className="w-full py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-semibold text-center cursor-pointer">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Add/Edit APK Form */}
        {activeTab === 'add-apk' && (
          <form onSubmit={handleSubmit} className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">{editingId ? 'Edit APK & Download Links' : 'Add New APK & Download Links'}</h2>
                <p className="text-xs text-gray-400">Configure main download link, mirror link, file size, and link status.</p>
              </div>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setActiveTab('apks'); }} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">
                  Cancel Edit
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <input type="text" placeholder="APK Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Version *" value={form.version} onChange={e => setForm({...form, version: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Package Name *" value={form.packageName} onChange={e => setForm({...form, packageName: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Developer" value={form.developer} onChange={e => setForm({...form, developer: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]">
                <option value="" disabled>Select Category *</option>
                {categories.map(cat => (<option key={cat._id} value={cat.name}>{cat.name}</option>))}
              </select>

              <input type="text" placeholder="Android Requirement" value={form.androidRequirement} onChange={e => setForm({...form, androidRequirement: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Slug *" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              
              <input type="text" placeholder="File Size *" value={form.apkSize} onChange={e => setForm({...form, apkSize: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-[#B8F000]/40 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-[#B8F000]/40 rounded-xl text-white focus:outline-none focus:border-[#B8F000]">
                <option value="draft">Link Status: Draft</option>
                <option value="published">Link Status: Published</option>
                <option value="archived">Link Status: Archived</option>
              </select>

              <input type="text" placeholder="Main Download URL *" value={form.downloadUrl} onChange={e => setForm({...form, downloadUrl: e.target.value})} required className="px-4 py-3 bg-[#0D0D12] border border-[#B8F000]/60 rounded-xl text-white focus:outline-none focus:border-[#B8F000] md:col-span-2" />
              <input type="text" placeholder="Mirror Download URL" value={form.mirrorDownloadUrl} onChange={e => setForm({...form, mirrorDownloadUrl: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />

              <input type="text" placeholder="App Icon URL" value={form.appIcon} onChange={e => setForm({...form, appIcon: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Featured Image URL" value={form.featuredImage} onChange={e => setForm({...form, featuredImage: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Screenshots" value={form.screenshots} onChange={e => setForm({...form, screenshots: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
            </div>

            <button type="submit" className="px-6 py-3 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm cursor-pointer">
              {editingId ? 'Update Download Links & Version' : 'Save & Publish Version'}
            </button>
          </form>
        )}

        {/* TAB 6: APKs Version & Download Management List */}
        {activeTab === 'apks' && (
          <div className="space-y-6">
            <div className="bg-[#121218] p-4 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-1/2 flex gap-2">
                  <input type="text" placeholder="Search by APK name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2.5 bg-[#0D0D12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#B8F000]" />
                  <input type="text" placeholder="Filter by package..." value={packageFilter} onChange={(e) => setPackageFilter(e.target.value)} className="w-full px-4 py-2.5 bg-[#0D0D12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#B8F000]" />
                </div>
              </div>
            </div>

            <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Download Links & Version Control</h2>
                <button onClick={() => setActiveTab('add-apk')} className="px-3 py-1.5 rounded-lg bg-[#B8F000] text-[#0D0D12] text-xs font-bold cursor-pointer">+ Upload New APK</button>
              </div>
              
              <div className="space-y-6">
                {Object.entries(groupedApks).map(([packageName, versions]) => (
                  <div key={packageName} className="bg-[#0D0D12] border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">{versions[0]?.name}</h3>
                        <p className="text-xs text-gray-400">Package: <span className="text-[#B8F000]">{packageName}</span></p>
                      </div>
                      <button onClick={() => handleAddVersion(versions[0])} className="px-3 py-1.5 rounded-lg bg-[#B8F000]/10 text-xs font-bold text-[#B8F000] cursor-pointer">+ Add New Version</button>
                    </div>

                    <div className="space-y-4">
                      {versions.map(apk => (
                        <div key={apk._id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-white">Version <span className="text-[#B8F000]">{apk.version}</span></p>
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(apk)} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-blue-400 cursor-pointer">Edit Links</button>
                              <button onClick={() => handleDelete(apk._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs text-red-400 cursor-pointer">Delete</button>
                            </div>
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

        {/* TAB 7:Global SEO Settings */}
        {activeTab === 'seo-settings' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white">Global Search Engine Optimization (SEO)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <input type="text" placeholder="Global SEO Title" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
              <input type="text" placeholder="Global Focus Keyword" value={form.focusKeyword} onChange={e => setForm({...form, focusKeyword: e.target.value})} className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" />
            </div>
          </div>
        )}

        {/* TAB 8:System Activity Log */}
        {activeTab === 'activity-log' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white">System Activity Log</h2>
            <p className="text-xs text-gray-400">Monitor admin actions, content updates, and user modifications across the platform.</p>
          </div>
        )}

      </main>
    </div>
  );
}