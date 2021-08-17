export const normalize = (min, max, value) => max - min > 0 ? (value - min) / (max - min) : null
