const localDataRequest = async () => {
  try {
    const res = await fetch("src/utils/images/images.json");
    if (!res.ok) {
      throw new Error("Ошибка");
    }
    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
  return data
};

export default localDataRequest
