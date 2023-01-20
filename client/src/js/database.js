import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO/DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put- Added to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data has been saved to the JATE database', result.value);
};

// TODO/DONE: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('Get-Retrieved from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  if (result) {
    console.log('Data has been retrieved from the JATE database', result.value);
    return result.value;
  } else {
    console.log('Data has not been found from the JATE database');
    return undefined;
  };
};


initdb();
