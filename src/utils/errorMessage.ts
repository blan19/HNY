enum ErrorMessage {
  isNotHTMLElementMsg = "타겟은 HTMLElement 인스턴스",
  isNotPropertyMsg = "프로퍼티가 존재하지 않습니다",
  isAlreadyRegisteredRefMsg = "이미 등록된 ref",
  isEmptyStringMsg = "빈 문자열",
  isApiError = "",
}

const HNYApiError = class extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
    this.name = "HNY-Api-Error";
  }
};

export { HNYApiError };
export default ErrorMessage;
