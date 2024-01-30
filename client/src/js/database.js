import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database", content);
    console.log("PUT to the database", content);
    const jateDb = await openDB("jate");
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ jate: content, id: 1 });
    const result = await request;
    console.log("Data saved to the database", result);
  } catch (error) {
    return;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const jateDb = await openDB("jate");
    const tx = jateDb.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log("result.value", result);
    return toString(result[0].jate);
  } catch (error) {
    return;
  }
};

initdb();
