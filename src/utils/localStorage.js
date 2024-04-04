const add = (key, values) => {
  localStorage.setItem(key, values);
};
const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
const clear = () => {
  return localStorage.clear();
};
const remove = (key) => {
  return localStorage.removeItem(key); 
}
export default {
  add,
  get,
  clear,
  remove,
};
