/**
 * Sebuah parser CSV minimal dan kuat yang sesuai dengan standar RFC 4180.
 * Menangani tanda kutip ganda (""), koma di dalam tanda kutip, dan baris baru di dalam sel.
 */
export function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let currentVal = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // Lewati tanda kutip berikutnya
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal.trim());
      result.push(row);
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    result.push(row);
  }
  
  // Saring baris kosong
  return result.filter(r => r.length > 0 && r.some(cell => cell !== ''));
}

/**
 * Mengonversi baris CSV (dengan baris pertama sebagai header) menjadi array objek key-value.
 */
export function csvToObjects<T extends Record<string, string>>(csvText: string): T[] {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];
  
  const headers = rows[0].map(h => h.toLowerCase().trim());
  const dataRows = rows.slice(1);
  
  return dataRows.map(row => {
    const obj = {} as Record<string, string>;
    headers.forEach((header, index) => {
      // Jika kolom kosong atau indeks melebihi kolom baris, isi dengan string kosong
      obj[header] = row[index] !== undefined ? row[index] : '';
    });
    return obj as T;
  });
}

/**
 * Mengonversi baris CSV bertipe Key-Value (dua kolom: Key dan Value) menjadi objek tunggal.
 */
export function csvToKeyValueMap(csvText: string): Record<string, string> {
  const rows = parseCSV(csvText);
  const map: Record<string, string> = {};
  
  rows.forEach(row => {
    if (row.length >= 2) {
      const key = row[0].toLowerCase().trim();
      const val = row[1].trim();
      if (key) {
        map[key] = val;
      }
    }
  });
  
  return map;
}
