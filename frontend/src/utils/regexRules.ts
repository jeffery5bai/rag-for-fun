/**
 * 以 RFC 5321 和 RFC 5322 對電子郵件地址格式的完整規範為基底，並擴充規則以符合大多數伺服器要求。
 * 本實作規範不包含少見的細微規範，如 Quoted Strings (")、Comments (())，以及 Domain Literals ([...])。
 * 大多數郵件伺服器要求有一個有效的頂級域（TLD）。因此，本實作規範要求電子郵件地址的頂級域至少有兩個字符。
 * *為什麼不使用 Regex 來實現這邊的 email 規範呢？* 因為 email 驗證非常複雜，不容易使用 Regex 來實現。可參閱此文件延伸閱讀：https://stackoverflow.com/questions/20771794/mailrfc822address-regex
 */
function emailRule(required: boolean = false) {
  return {
    required,
    validator(
      _: unknown,
      email: string,
      callback: (error?: string | undefined) => void,
    ) {
      if (!required && !email) {
        callback();
        return;
      }

      const msg = `請輸入${required ? '必填' : '選填'}的正確電子郵件格式`;

      if (!email) {
        callback(msg);
        return;
      }

      // 定義RFC 5322所規定的電子郵件正則表達式
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      // 檢查總長度是否超過254個字符
      if (email.length > 254) {
        callback(msg);
        return;
      }

      // 使用正則表達式檢查電子郵件格式
      if (!emailRegex.test(email)) {
        callback(msg);
        return;
      }

      // 分割local-part和domain部分
      const [localPart, domain] = email.split('@');

      // 檢查local-part是否超過64個字符
      if (localPart.length > 64) {
        callback(msg);
        return;
      }

      // 檢查local-part中點的規範
      if (
        localPart.startsWith('.') ||
        localPart.endsWith('.') ||
        localPart.includes('..')
      ) {
        callback(msg);
        return;
      }

      // 檢查domain部分是否包含至少一個點和有效的頂級域
      const domainParts = domain.split('.');
      if (domainParts.length < 2) {
        callback(msg);
        return;
      }

      // 檢查domain部分的每個標籤
      if (
        domainParts.some(
          (part) =>
            part.length > 63 || part.startsWith('-') || part.endsWith('-'),
        )
      ) {
        callback(msg);
        return;
      }

      // 檢查頂級域是否至少有兩個字符
      const topLevelDomain = domainParts[domainParts.length - 1];
      if (topLevelDomain.length < 2) {
        callback(msg);
        return;
      }

      callback();
    },
  };
}

export { emailRule };