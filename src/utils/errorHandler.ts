class ErrorHandler extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super();
    this.message = message || "Error :(";
    this.status = status || 500;
  }
}
export default ErrorHandler;
