export default interface GaspData {
  grid: {
    [key: string]: {
      [key: string]: number[]
    }
  },
  timestamps: number[]
}

export interface GaspDataRange {
  [key: string]: number[]
}
