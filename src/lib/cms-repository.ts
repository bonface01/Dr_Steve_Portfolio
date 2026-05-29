import { getClientDb, getClientStorage, isFirebaseConfigured } from './firebase';

export interface CmsEntity {
  id: string;
}

/**
 * Service to handle data persistence across Firebase and LocalStorage.
 * This abstracts the logic seen in functions like _, aa, and ab in your bundle.
 */
export const cmsRepository = {
  async save<T extends CmsEntity>(collectionName: string, localStorageKey: string, data: T): Promise<void> {
    const db = getClientDb();
    if (isFirebaseConfigured && db) {
      await db.collection(collectionName).doc(data.id).set(data, { merge: true });
    } else {
      const localData = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
      const filtered = localData.filter((item: any) => item.id !== data.id);
      localStorage.setItem(localStorageKey, JSON.stringify([data, ...filtered]));
    }
  },

  async delete(collectionName: string, localStorageKey: string, id: string): Promise<void> {
    const db = getClientDb();
    if (isFirebaseConfigured && db) {
      await db.collection(collectionName).doc(id).delete();
    } else {
      const localData = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
      const updated = localData.filter((item: any) => item.id !== id);
      localStorage.setItem(localStorageKey, JSON.stringify(updated));
    }
  },

  async uploadImage(file: File, folder: string): Promise<string> {
    const storage = getClientStorage();
    if (isFirebaseConfigured && storage) {
      const imageRef = storage.ref(`${folder}/${Date.now()}-${file.name}`);
      const snapshot = await imageRef.put(file);
      return await snapshot.ref.getDownloadURL();
    }

    // Fallback to Base64 for local storage mode
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }
};