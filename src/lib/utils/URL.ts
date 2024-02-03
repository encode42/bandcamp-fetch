export class URL {
  public href: string;
  public searchParams: URLSearchParams;

  constructor(url: string) {
    this.href = url;
    this.searchParams = new URLSearchParams();
  }

  public toString() {
    return `${this.href}${this.searchParams.toString()}`;
  }
}

export class URLSearchParams {
  private values: Record<string, string> = {};

  public set(key: string, value: string) {
    this.values[key] = value;
  }

  public toString() {
    const pairs: string[] = [];

    for (const [ key, value ] of Object.entries(this.values)) {
      pairs.push(`${key}=${encodeURIComponent(value)}`);
    }

    if (pairs.length > 0) {
      return `?${pairs.join('&')}`;
    }

    return '';
  }
}
