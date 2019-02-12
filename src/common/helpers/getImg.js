export default (img, files) => {
  const start = img.lastIndexOf(".");
  const ext = img.slice(start + 1);

  return files[ext](`./${img}`);
};
