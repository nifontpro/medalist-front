export const convertCorrectDataForUnix = (data: string): string => {
  let correctData: string = `${data[6]}${data[7]}${data[8]}${data[9]}.${data[3]}${data[4]}.${data[0]}${data[1]}`;
  return correctData;
};
