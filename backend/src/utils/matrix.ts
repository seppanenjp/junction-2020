export const initMatrix = (): number[][] => {
  const m = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < i; j++) {
      if (i != j) {
        m.push([i, j]);
      }
    }
  }
  return m;
};

export const customArgMax = (arr) => {
  let max_value = 0;
  let arg_max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max_value) {
      max_value = arr[i];
      arg_max = i;
    } else {
      // No action
    }
  }
  return arg_max;
};

export const calculateUtilities = (utility_value_matrix) => {
  const restaurant_rankings = [];
  for (
    let column_index = 0;
    column_index < utility_value_matrix[0].length;
    column_index++
  ) {
    let val = 0;
    for (
      let row_index = 0;
      row_index < utility_value_matrix.length;
      row_index++
    ) {
      val += utility_value_matrix[row_index][column_index];
    }
    restaurant_rankings.push(val);
  }
  return restaurant_rankings;
};
