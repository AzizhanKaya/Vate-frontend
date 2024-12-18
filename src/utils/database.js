const DB_NAME = "PostLikesDB";
const DB_VERSION = 1;

function initDB() {
  return new Promise((resolve, reject) => {
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains("likedPosts")) {
        db.createObjectStore("likedPosts", { keyPath: "hash" });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("Veritabanı bağlantısı hatası:", event.target.error);
      reject(event.target.error);
    };
  });
}



export async function savePostHash(hash, post, like) {
    const db = await initDB();
    const transaction = db.transaction("likedPosts", "readwrite");
    const store = transaction.objectStore("likedPosts");

    const data = { ...post, like, hash };

    store.put(data);

    transaction.oncomplete = () => {
      return true;
    };

    transaction.onerror = (event) => {
      console.error("Post kaydetme hatası:", event.target.error);
    };
}



export async function getPostByHash(hash) {
  const db = await initDB();
  const transaction = db.transaction("likedPosts", "readonly");
  const store = transaction.objectStore("likedPosts");

  return new Promise((resolve, reject) => {
    const request = store.get(hash);

    request.onsuccess = (event) => {
      const result = event.target.result;
      if (result) {
        resolve(result);
      } else {
        resolve(null);
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}


export async function deletePostByHash(hash) {
    const db = await initDB();
    const transaction = db.transaction("likedPosts", "readwrite");
    const store = transaction.objectStore("likedPosts");
  
    return new Promise((resolve, reject) => {
      const request = store.delete(hash);
  
      request.onsuccess = () => {
        resolve(true);
      };
  
      request.onerror = (event) => {
        console.error("Hash silme hatası:", event.target.error);
        reject(event.target.error);
      };
    });
}

export async function clearAllLikes() {
  const db = await initDB();
  const transaction = db.transaction("likedPosts", "readwrite");
  const store = transaction.objectStore("likedPosts");

  const request = store.clear();
  
  return new Promise((resolve, reject) => {
      request.onsuccess = () => {
          console.log("Tüm veriler başarıyla silindi.");
          resolve(true);
      };
      request.onerror = (event) => {
          console.error("Veri silme hatası:", event.target.error);
          reject(event.target.error);
      };
  });
} 