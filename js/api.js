 function getSatistics(name, type) {
  const user = JSON.parse(localStorage.getItem("User"));
  if (user.statistics.length === 0) {
    return 0;
  }
  const obj = user.statistics.find((el) => el.name === name);
  if (!obj) return 0;

  return obj[type];
}

export const api = {
    getSatistics: getSatistics,
} 