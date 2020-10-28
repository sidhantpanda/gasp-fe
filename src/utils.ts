import GaspData from './types/GaspData';

export const asyncWait = (miliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, miliseconds));

const dataKeys = [
  'fmi_no2',
];

export const generateRandomData = (): GaspData => {
  const data: GaspData = { grid: {}, timestamps: [] };
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const key = `cell_${i}_${j}`;
      data.grid[key] = {
        fmi_no2: []
      };
      dataKeys.forEach(dataKey => {
        data.grid[key][dataKey] = [];
        for (let k = 0; k < 20; k++) {
          data.grid[key][dataKey].push(Math.floor(Math.random() * 100));
        }
      })
    }
  }
  return data;
}