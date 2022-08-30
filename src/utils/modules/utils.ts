/**
 * @description 获取 Cookie 值
 * @param name cookie 字段名
 */
function getCookie(name: string): string | undefined {
  const cookies = document.cookie;
  if (!cookies) return;
  const needItem = cookies.split('; ').find((item) => item?.split('=')?.[0] === name);
  return needItem?.split('=')[1];
}

export { getCookie };
