export function cleanData(data) {
  if (!data) return null;
  return JSON.parse(JSON.stringify(data)); // converts ObjectId & Date to strings
}