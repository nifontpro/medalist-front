export function checkSameIdInArrays<T extends { id?: number }>(
  arr1: T[] | undefined,
  arr2: T[] | undefined
): boolean {
  if (arr1 && arr2) {
    const ids1 = arr1.map((user) => user.id);
    const ids2 = arr2.map((user) => user.id);

    return ids1.some((id) => ids2.includes(id));
  } else {
    return false;
  }
}

// module.exports = checkSameIdInArrays;
