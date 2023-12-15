// current date formatter
export const currentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  return formattedDate
};

// UUID generator
export const generateUUID = () => {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);

  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

  const uuid = Array.from(randomBytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`;
}