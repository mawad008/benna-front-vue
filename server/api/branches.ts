
export default defineEventHandler(async () => {
    const response = await $fetch('https://benaa.webstdy.com/api/Branches');
    return response;
  });
  