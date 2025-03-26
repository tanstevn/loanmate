export class InMemoryRepository {
  private data: Record<string, any[]>;

  constructor() {
    this.data = {};
  }

  getEntity(name: string): any[] {
    if (!this.data[name]) {
      this.data[name] = [];
    }

    return this.data[name] as any[];
  }

  add(name: string, item: any): void {
    this.getEntity(name).push(item);
  }
}
