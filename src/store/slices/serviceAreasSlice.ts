import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  getDocs, 
  getDoc,
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

export interface ServiceArea {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceAreasState {
  areas: ServiceArea[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceAreasState = {
  areas: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchServiceAreas = createAsyncThunk(
  'serviceAreas/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const areasRef = collection(db, 'service_areas');
      // First try with orderBy, if it fails, fetch without orderBy
      let snapshot;
      try {
        const q = query(areasRef, where('isActive', '==', true), orderBy('order'));
        snapshot = await getDocs(q);
      } catch {
        // If orderBy fails (missing index), fetch without orderBy
        const q = query(areasRef, where('isActive', '==', true));
        snapshot = await getDocs(q);
      }
      
      const areas = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Timestamps to strings
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as ServiceArea;
      });
      
      // Sort manually if orderBy failed
      areas.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return areas;
    } catch (error) {
      console.error('Error fetching service areas:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Admin için tüm hizmet bölgelerini getir (filtresiz)
export const fetchAllServiceAreas = createAsyncThunk(
  'serviceAreas/fetchAllAreas',
  async (_, { rejectWithValue }) => {
    try {
      const areasRef = collection(db, 'service_areas');
      let snapshot;
      try {
        const q = query(areasRef, orderBy('order', 'asc'));
        snapshot = await getDocs(q);
      } catch {
        // If orderBy fails, fetch without orderBy
        snapshot = await getDocs(areasRef);
      }
      
      const areas = snapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as ServiceArea;
      });
      
      // Sort manually if orderBy failed
      areas.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return areas;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchServiceAreaById = createAsyncThunk(
  'serviceAreas/fetchAreaById',
  async (id: string, { rejectWithValue }) => {
    try {
      const areaDocRef = doc(db, 'service_areas', id);
      const areaSnapshot = await getDoc(areaDocRef);
      if (!areaSnapshot.exists()) {
        throw new Error('Service area not found');
      }
      const data = areaSnapshot.data();
      const convertedData = convertTimestamps(data);
      return { id: areaSnapshot.id, ...convertedData } as ServiceArea;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addServiceArea = createAsyncThunk(
  'serviceAreas/addArea',
  async (areaData: Omit<ServiceArea, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'service_areas'), {
        ...areaData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...areaData } as ServiceArea;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateServiceArea = createAsyncThunk(
  'serviceAreas/updateArea',
  async ({ id, data }: { id: string; data: Partial<ServiceArea> }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'service_areas', id);
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

export const deleteServiceArea = createAsyncThunk(
  'serviceAreas/deleteArea',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'service_areas', id));
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const serviceAreasSlice = createSlice({
  name: 'serviceAreas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch areas
    builder
      .addCase(fetchServiceAreas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.areas = action.payload;
      })
      .addCase(fetchServiceAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch area by id
    builder
      .addCase(fetchServiceAreaById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceAreaById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.areas.findIndex(area => area.id === action.payload.id);
        if (index !== -1) {
          state.areas[index] = action.payload;
        } else {
          state.areas.push(action.payload);
        }
      })
      .addCase(fetchServiceAreaById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add area
    builder
      .addCase(addServiceArea.fulfilled, (state, action) => {
        state.areas.push(action.payload);
      });

    // Update area
    builder
      .addCase(updateServiceArea.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.areas.findIndex(area => area.id === id);
        if (index !== -1) {
          state.areas[index] = { ...state.areas[index], ...data };
        }
      });

    // Delete area
    builder
      .addCase(deleteServiceArea.fulfilled, (state, action) => {
        state.areas = state.areas.filter(area => area.id !== action.payload);
      });

    // Fetch all areas (admin)
    builder
      .addCase(fetchAllServiceAreas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllServiceAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAllServiceAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = serviceAreasSlice.actions;
export default serviceAreasSlice.reducer;

