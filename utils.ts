export async function go(func: () => Promise<any>) {
  await func();
}
