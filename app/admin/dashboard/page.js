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
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
      const statsRes = await fetch(`${API_URL}/api/admin/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const statsData = await statsRes.json();
      setStats(statsData);

      const apksRes = await fetch(`${API_URL}/api/admin/apks`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const apksData = await apksRes.json();
      if (Array.isArray(apksData)) setApks(apksData);

      const catRes = await fetch(`${API_URL}/api/admin/categories`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const catData = await catRes.json();
      if (Array.isArray(catData)) setCategories(catData);

      const mediaRes = await fetch(`${API_URL}/api/admin/media`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      const mediaData = await mediaRes.json();
      if (Array.isArray(mediaData)) setMediaList(mediaData);

      const usersRes = await fetch(`${API_URL}/api/admin/users`, {
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

  // Categories Submit Handler
  const handleCatSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingCatId 
      ? `${API_URL}/api/admin/categories/edit/${editingCatId}`
      : `${API_URL}/api/admin/categories/add`;
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
      const res = await fetch(`${API_URL}/api/admin/categories/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete category');
      setMessage('Category deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  // Admin User Submission Handler
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingAdminId 
      ? `${API_URL}/api/admin/users/edit/${editingAdminId}`
      : `${API_URL}/api/admin/users/add`;
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
      const res = await fetch(`${API_URL}/api/admin/users/delete/${id}`, {
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
      const res = await fetch(`${API_URL}/api/admin/media/upload`, {
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

  const handleDeleteMedia = async (id) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/api/admin/media/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete media');
      setMessage('Media deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDeleteApk = async (id) => {
    if (!confirm('Are you sure you want to delete this APK?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/api/admin/apk/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete APK');
      setMessage('APK deleted successfully!');
      fetchDashboardData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleEditApkClick = (apk) => {
    setEditingId(apk._id);
    setForm({
      name: apk.name || '',
      version: apk.version || '',
      packageName: apk.packageName || '',
      developer: apk.developer || 'VibeShort Inc.',
      category: apk.category || '',
      apkSize: apk.apkSize || '50 MB',
      androidRequirement: apk.androidRequirement || 'Android 5.0+',
      appIcon: apk.appIcon || '',
      featuredImage: apk.featuredImage || '',
      screenshots: Array.isArray(apk.screenshots) ? apk.screenshots.join(', ') : (apk.screenshots || ''),
      shortDescription: apk.shortDescription || '',
      fullDescription: apk.fullDescription || '',
      features: Array.isArray(apk.features) ? apk.features.join('\n') : (apk.features || ''),
      whatsNew: apk.whatsNew || '',
      downloadUrl: apk.downloadUrl || '',
      mirrorDownloadUrl: apk.mirrorDownloadUrl || '',
      officialWebsite: apk.officialWebsite || '',
      lastUpdated: apk.lastUpdated ? apk.lastUpdated.split('T')[0] : '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    const url = editingId 
      ? `${API_URL}/api/admin/apk/edit/${editingId}`
      : `${API_URL}/api/admin/apk/add`;
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
        name: '', version: '', packageName: '', developer: 'VibeShort Inc.',
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

  // Filtered APKs list
  const filteredApks = apks.filter(apk => {
    const matchesSearch = apk.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          apk.packageName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? apk.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? apk.status === selectedStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredMedia = mediaList.filter(item => {
    if (mediaTypeFilter === 'all') return true;
    return item.mediaType === mediaTypeFilter;
  });

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
          </div>
        )}

        {/* TAB 2: Admin Users Management */}
        {activeTab === 'admin-users' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">{editingAdminId ? 'Edit Admin User' : 'Add New Admin User'}</h2>
                <p className="text-xs text-gray-400">Configure credentials and roles for collaborators.</p>
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
                  placeholder={editingAdminId ? 'New Password (optional)' : 'Password *'} 
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
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm cursor-pointer"
              >
                {editingAdminId ? 'Update Admin User' : 'Save Admin User'}
              </button>
            </form>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="text-md font-bold text-white">Existing Admin Users</h3>
              <div className="space-y-2">
                {adminUsers.map((admin) => (
                  <div key={admin._id} className="flex items-center justify-between p-4 bg-[#0D0D12] rounded-xl border border-white/5">
                    <div>
                      <p className="font-bold text-sm text-white">{admin.username} <span className="text-xs text-[#B8F000] font-normal">({admin.role})</span></p>
                      <p className="text-xs text-gray-400">{admin.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingAdminId(admin._id);
                          setAdminForm({ username: admin.username, email: admin.email, password: '', role: admin.role, permissions: admin.permissions || [] });
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">{editingCatId ? 'Edit Category' : 'Add New Category'}</h2>
                <p className="text-xs text-gray-400">Organize your applications into logical groups.</p>
              </div>
              {editingCatId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCatId(null);
                    setCatForm({ name: '', slug: '', description: '' });
                  }}
                  className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleCatSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <input 
                  type="text" 
                  placeholder="Category Name *" 
                  value={catForm.name} 
                  onChange={e => setCatForm({...catForm, name: e.target.value})} 
                  required 
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" 
                />
                <input 
                  type="text" 
                  placeholder="Slug (optional)" 
                  value={catForm.slug} 
                  onChange={e => setCatForm({...catForm, slug: e.target.value})} 
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" 
                />
                <input 
                  type="text" 
                  placeholder="Description" 
                  value={catForm.description} 
                  onChange={e => setCatForm({...catForm, description: e.target.value})} 
                  className="px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#B8F000]" 
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm cursor-pointer"
              >
                {editingCatId ? 'Update Category' : 'Save Category'}
              </button>
            </form>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="text-md font-bold text-white">Existing Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat._id} className="p-4 bg-[#0D0D12] rounded-xl border border-white/5 space-y-2 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-sm text-white">{cat.name}</p>
                      <p className="text-xs text-gray-400">Slug: {cat.slug}</p>
                      <p className="text-xs text-gray-500 mt-1">{cat.description || 'No description'}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingCatId(cat._id);
                          setCatForm({ name: cat.name, slug: cat.slug, description: cat.description || '' });
                        }}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Media Library */}
        {activeTab === 'media' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Media Library</h2>
                <p className="text-xs text-gray-400">Upload and manage images, icons, and screenshots.</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={mediaTypeFilter}
                  onChange={e => setMediaTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="icon">Icons</option>
                  <option value="screenshot">Screenshots</option>
                  <option value="general">General</option>
                </select>
                <label className="px-4 py-2 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-xs cursor-pointer">
                  {uploadingMedia ? 'Uploading...' : '+ Upload Images'}
                  <input type="file" multiple onChange={e => handleMediaUpload(e, 'general')} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div key={item._id} className="bg-[#0D0D12] rounded-xl border border-white/10 overflow-hidden group relative flex flex-col justify-between">
                  <div className="h-32 bg-black/40 flex items-center justify-center overflow-hidden">
                    <img src={item.url} alt={item.filename || 'Media'} className="object-cover w-full h-full group-hover:scale-105 transition" />
                  </div>
                  <div className="p-2.5 space-y-1">
                    <p className="text-xs text-gray-300 truncate">{item.filename || 'Image'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#B8F000] uppercase font-bold">{item.mediaType}</span>
                      <button
                        onClick={() => handleDeleteMedia(item._id)}
                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: APKs Version & Downloads */}
        {activeTab === 'apks' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">All APKs & Versions</h2>
                <p className="text-xs text-gray-400">Manage published apps, downloads, and versions.</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Search APK..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none"
                />
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none"
                >
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredApks.map((apk) => (
                <div key={apk._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#0D0D12] rounded-xl border border-white/5 gap-4">
                  <div className="flex items-center gap-4">
                    {apk.appIcon ? (
                      <img src={apk.appIcon} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-gray-400">APK</div>
                    )}
                    <div>
                      <p className="font-bold text-sm text-white">{apk.name} <span className="text-xs font-normal text-gray-400">v{apk.version}</span></p>
                      <p className="text-xs text-gray-400">Package: {apk.packageName} | Category: {apk.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${apk.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {apk.status}
                    </span>
                    <button
                      onClick={() => handleEditApkClick(apk)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteApk(apk._id)}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Add / Edit APK Form */}
        {activeTab === 'add-apk' && (
          <div className="bg-[#121218] p-6 rounded-2xl border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white">{editingId ? 'Edit APK Details' : 'Add New APK Details'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">App Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Version *</label>
                  <input type="text" value={form.version} onChange={e => setForm({...form, version: e.target.value})} required className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Package Name (com.app) *</label>
                  <input type="text" value={form.packageName} onChange={e => setForm({...form, packageName: e.target.value})} required className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} required className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">App Icon URL</label>
                  <input type="text" value={form.appIcon} onChange={e => setForm({...form, appIcon: e.target.value})} className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Download URL *</label>
                  <input type="text" value={form.downloadUrl} onChange={e => setForm({...form, downloadUrl: e.target.value})} required className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Mirror Download URL</label>
                  <input type="text" value={form.mirrorDownloadUrl} onChange={e => setForm({...form, mirrorDownloadUrl: e.target.value})} className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Description</label>
                <textarea value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} rows="2" className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white focus:outline-none text-sm"></textarea>
              </div>

              <button type="submit" className="px-6 py-3 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm cursor-pointer">
                {editingId ? 'Update APK' : 'Publish APK'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}