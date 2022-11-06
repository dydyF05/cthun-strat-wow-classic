// const colors = {
//   red: '#bb292a',
//   yellow: '#ebd118',
//   blue: '#3fc6f5',
//   green: '#42b54b',
//   grey: '#646464',
//   white: '#ffffff',
// };

export const getColorForGroupIndex = (index: number) => {
  switch (index) {
    case 0:
      return '#524a79';
    case 1:
      return '#4c9173';
    case 2:
      return '#f1b24b';
    case 3:
      return '#f1f4c6';
    case 4:
      return '#d789d7';
    case 5:
      return '#f96d6d';
    case 6:
      return '#46322b';
    default:
      return '#333a7b';
  }
};
