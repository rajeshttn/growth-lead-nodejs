exports.clone = function (a) {
  if (!a) return a;
  return JSON.parse(JSON.stringify(a));
}