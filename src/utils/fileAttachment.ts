export const MAX_COMMUNITY_FILE_BYTES = 1_200_000;

const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx|txt|png|jpe?g|gif|webp)$/i;

export function validateCommunityFile(file: File): string | null {
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return 'Choose a PDF, Word document, text file or image.';
  }
  if (file.size > MAX_COMMUNITY_FILE_BYTES) {
    return 'Keep files under 1.2 MB so they fit on a shared phone.';
  }
  return null;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });
}

export function fileExtensionLabel(name: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(name);
  return match ? match[1].toUpperCase() : 'FILE';
}
