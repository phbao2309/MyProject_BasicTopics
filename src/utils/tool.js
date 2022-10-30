export const shuffed = (list) => list.sort(() => Math.random() - 0.5);

export const sleep = (ms) => new Promise(res => setTimeout(res, ms));