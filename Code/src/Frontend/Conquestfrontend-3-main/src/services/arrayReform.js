export const arrayReform = (array, key1, key2, price) =>
  array.map((item) => ({
    value: item[key1],
    label: `${item[key2]}  ${price ? "$ " + item[price] : ""}`,
  }));

export const dataTrancformer = (array, key1, key2, key3) =>
  array.map((item) => ({
    value: item[key1],
    label: `${item[key2]} ${key3 && item[key3] > 0 ? item[key3] : ''}`,
  }));
