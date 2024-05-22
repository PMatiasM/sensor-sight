export class BLEBuffer {
  private _value = "";
  private _decoder = new TextDecoder();

  public get value(): string {
    return this._value;
  }

  public add(text: DataView): void {
    this._value += this._decoder.decode(text);
  }

  public isFull(): boolean {
    return !!/\n/.exec(this._value);
  }

  public clean(): void {
    this._value = "";
  }
}
