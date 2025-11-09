'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import CkEditorClient from '@/components/CkEditorClient';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchAllServiceAreas, 
  addServiceArea, 
  updateServiceArea, 
  deleteServiceArea 
} from '@/store/slices/serviceAreasSlice';

interface ServiceArea {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  isActive: boolean;
  order: number;
  createdAt?: string | Date;
  updatedAt?: string;
}

const HizmetBolgeleriAdminPage = () => {
  const dispatch = useAppDispatch();
  const { areas: storeAreas, isLoading } = useAppSelector((state) => state.serviceAreas);
  
  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] = useState<ServiceArea | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    isActive: true,
    order: 0
  });
  const [uploading, setUploading] = useState(false);

  const fetchServiceAreas = useCallback(async () => {
    try {
      await dispatch(fetchAllServiceAreas()).unwrap();
    } catch (error) {
      console.error('Hizmet bölgeleri yüklenirken hata:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchServiceAreas();
  }, [fetchServiceAreas]);

  // Store'dan gelen verileri ServiceArea formatına çevir
  const serviceAreas: ServiceArea[] = storeAreas.map(area => ({
    ...area,
    createdAt: area.createdAt ? new Date(area.createdAt) : new Date()
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      setUploading(true);

      // URL formatını düzelt
      let formattedImageUrl = formData.imageUrl;
      if (formattedImageUrl && !formattedImageUrl.startsWith('http://') && !formattedImageUrl.startsWith('https://')) {
        formattedImageUrl = `https://${formattedImageUrl}`;
      }

      if (editingArea) {
        // Update existing
        await dispatch(updateServiceArea({
          id: editingArea.id,
          data: {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            imageUrl: formattedImageUrl,
            isActive: formData.isActive,
            order: formData.order
          }
        })).unwrap();
      } else {
        // Create new
        await dispatch(addServiceArea({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          imageUrl: formattedImageUrl,
          isActive: formData.isActive,
          order: formData.order
        })).unwrap();
      }

      setShowModal(false);
      setEditingArea(null);
      setFormData({ title: '', description: '', content: '', imageUrl: '', isActive: true, order: 0 });
      fetchServiceAreas();
    } catch (error) {
      console.error('Hizmet bölgesi kaydedilirken hata:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (area: ServiceArea) => {
    setEditingArea(area);
    setFormData({
      title: area.title,
      description: area.description,
      content: area.content,
      imageUrl: area.imageUrl,
      isActive: area.isActive,
      order: area.order
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmet bölgesini silmek istediğinizden emin misiniz?')) return;

    try {
      await dispatch(deleteServiceArea(id)).unwrap();
      fetchServiceAreas();
    } catch (error) {
      console.error('Hizmet bölgesi silinirken hata:', error);
    }
  };

  const toggleActive = async (area: ServiceArea) => {
    try {
      await dispatch(updateServiceArea({
        id: area.id,
        data: { isActive: !area.isActive }
      })).unwrap();
      fetchServiceAreas();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', content: '', imageUrl: '', isActive: true, order: 0 });
    setEditingArea(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hizmet Bölgeleri Yönetimi</h1>
            <p className="text-gray-600 mt-2">Hizmet verdiğiniz bölgeleri yönetin</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            + Yeni Hizmet Bölgesi
          </button>
        </div>

        {/* Service Areas List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Görsel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sıra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        {area.imageUrl ? (
                          <Image
                            src={area.imageUrl}
                            alt={area.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            🏢
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{area.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {area.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{area.order}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(area)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          area.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {area.isActive ? 'Aktif' : 'Pasif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(area)}
                        className="text-amber-600 hover:text-amber-900 mr-4"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(area.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {serviceAreas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <div className="text-8xl mb-6">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Henüz hizmet bölgesi eklenmemiş</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              İlk hizmet bölgenizi ekleyerek başlayın. Bu bölgeler ana sayfada ve hizmet bölgeleri sayfasında görüntülenecek.
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              + İlk Hizmet Bölgesini Ekle
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingArea ? 'Hizmet Bölgesi Düzenle' : 'Yeni Hizmet Bölgesi'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Örn: Kadıköy, Beşiktaş, Şişli..."
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kısa Açıklama
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Bu bölge hakkında kısa açıklama..."
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Görsel URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="www.example.com/image.jpg veya https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL başında http:// veya https:// yoksa otomatik olarak https:// eklenecektir
                  </p>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={formData.imageUrl}
                        alt="Önizleme"
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sıralama
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Aktif (Görünür)
                  </label>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detaylı İçerik
                  </label>
                  <CkEditorClient
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder="Bu bölge hakkında detaylı bilgi..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Kaydediliyor...' : (editingArea ? 'Güncelle' : 'Kaydet')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HizmetBolgeleriAdminPage;
