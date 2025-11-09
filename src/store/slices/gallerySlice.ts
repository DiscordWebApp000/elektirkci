import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Helper function to convert Firestore Timestamp to string
const convertTimestamp = (value: unknown): unknown => {
  if (!value || typeof value !== 'object') {
    return value;
  }
  
  // Check if it's a Firestore Timestamp (has toDate method)
  if ('toDate' in value && typeof value.toDate === 'function') {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString();
    } catch {
      // If toDate fails, try using seconds
      if ('seconds' in value && typeof value.seconds === 'number') {
        return new Date(value.seconds * 1000).toISOString();
      }
    }
  }
  
  // Check if it has seconds property (Firestore Timestamp structure)
  if ('seconds' in value && typeof value.seconds === 'number') {
    return new Date(value.seconds * 1000).toISOString();
  }
  
  return value;
};

// Helper function to convert all Timestamps in an object
const convertTimestamps = (obj: unknown): Record<string, unknown> => {
  if (obj === null || obj === undefined) {
    return {} as Record<string, unknown>;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps) as unknown as Record<string, unknown>;
  }
  if (typeof obj === 'object') {
    const converted: Record<string, unknown> = {};
    for (const key in obj) {
      converted[key] = convertTimestamp((obj as Record<string, unknown>)[key]);
      if (typeof converted[key] === 'object' && converted[key] !== null && !Array.isArray(converted[key])) {
        converted[key] = convertTimestamps(converted[key]);
      }
    }
    return converted;
  }
  return obj as Record<string, unknown>;
};

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface GalleryState {
  items: GalleryItem[];
  featuredItems: GalleryItem[];
  categories: GalleryCategory[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
  isUploading: boolean;
}

const initialState: GalleryState = {
  items: [],
  featuredItems: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
  isUploading: false,
};

// Async thunks
export const fetchGalleryCategories = createAsyncThunk(
  'gallery/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categoriesRef = collection(db, 'gallery_categories');
      const q = query(categoriesRef, where('isActive', '==', true), orderBy('order'));
      const snapshot = await getDocs(q);
      const categories = snapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as GalleryCategory;
      });
      return categories;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchGalleryItems = createAsyncThunk(
  'gallery/fetchItems',
  async (categoryId: string | undefined, { rejectWithValue }) => {
    try {
      const itemsRef = collection(db, 'gallery_items');
      let q = query(itemsRef, where('isActive', '==', true), orderBy('order'));
      
      if (categoryId) {
        q = query(itemsRef, where('categoryId', '==', categoryId), where('isActive', '==', true), orderBy('order'));
      }
      
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as GalleryItem;
      });
      return items;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchFeaturedGalleryItems = createAsyncThunk(
  'gallery/fetchFeaturedItems',
  async (limit: number = 3, { rejectWithValue }) => {
    try {
      const itemsRef = collection(db, 'gallery_items');
      // First try with orderBy, if it fails, fetch without orderBy
      let snapshot;
      try {
        const q = query(
          itemsRef, 
          where('isActive', '==', true), 
          where('isFeatured', '==', true), 
          orderBy('order')
        );
        snapshot = await getDocs(q);
      } catch {
        // If orderBy fails (missing index), fetch without orderBy
        const q = query(
          itemsRef, 
          where('isActive', '==', true), 
          where('isFeatured', '==', true)
        );
        snapshot = await getDocs(q);
      }
      
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as GalleryItem;
      });
      
      // Sort manually if orderBy failed
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return items.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured gallery items:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Dashboard için tüm galeri öğelerini getir (filtresiz)
export const fetchAllGalleryItems = createAsyncThunk(
  'gallery/fetchAllItems',
  async (_, { rejectWithValue }) => {
    try {
      const itemsRef = collection(db, 'gallery_items');
      const snapshot = await getDocs(itemsRef);
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as GalleryItem;
      });
      return items;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Dashboard için tüm kategorileri getir (filtresiz)
export const fetchAllGalleryCategories = createAsyncThunk(
  'gallery/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categoriesRef = collection(db, 'gallery_categories');
      const snapshot = await getDocs(categoriesRef);
      const categories = snapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as GalleryCategory;
      });
      return categories;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addGalleryCategory = createAsyncThunk(
  'gallery/addCategory',
  async (categoryData: Omit<GalleryCategory, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'gallery_categories'), {
        ...categoryData,
        order: categoryData.order || 0,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...categoryData } as GalleryCategory;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateGalleryCategory = createAsyncThunk(
  'gallery/updateCategory',
  async ({ id, data }: { id: string; data: Partial<GalleryCategory> }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'gallery_categories', id);
      await updateDoc(docRef, {
        ...data,
      });
      return { id, data };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteGalleryCategory = createAsyncThunk(
  'gallery/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'gallery_categories', id));
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addGalleryItem = createAsyncThunk(
  'gallery/addItem',
  async (itemData: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'gallery_items'), {
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...itemData };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateGalleryItem = createAsyncThunk(
  'gallery/updateItem',
  async ({ id, data }: { id: string; data: Partial<GalleryItem> }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'gallery_items', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      return { id, data };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteGalleryItem = createAsyncThunk(
  'gallery/deleteItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'gallery_items', id));
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch categories
    builder
      .addCase(fetchGalleryCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGalleryCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchGalleryCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch items
    builder
      .addCase(fetchGalleryItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch featured items
    builder
      .addCase(fetchFeaturedGalleryItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedGalleryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredItems = action.payload;
      })
      .addCase(fetchFeaturedGalleryItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add item
    builder
      .addCase(addGalleryItem.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(addGalleryItem.fulfilled, (state, action) => {
        state.isUploading = false;
        state.items.push(action.payload as GalleryItem);
      })
      .addCase(addGalleryItem.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload as string;
      });

    // Update item
    builder
      .addCase(updateGalleryItem.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...data };
        }
      });

    // Add category
    builder
      .addCase(addGalleryCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });

    // Update category
    builder
      .addCase(updateGalleryCategory.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
          state.categories[index] = { ...state.categories[index], ...data };
        }
      });

    // Delete category
    builder
      .addCase(deleteGalleryCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      });

    // Delete item
    builder
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });

    // Fetch all items (dashboard and admin)
    builder
      .addCase(fetchAllGalleryItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllGalleryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllGalleryItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch all categories (dashboard and admin)
    builder
      .addCase(fetchAllGalleryCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllGalleryCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllGalleryCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory, clearError, setUploading } = gallerySlice.actions;
export default gallerySlice.reducer;
