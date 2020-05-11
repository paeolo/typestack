// sleep.ts

export const sleep = async () => {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  })
}
