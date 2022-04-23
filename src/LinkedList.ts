type NullOr<T> = T | null;

class Node<T> {
  next: NullOr<Node<T>>;
  value: NullOr<T>;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: NullOr<Node<T>>;
  private tail: NullOr<Node<T>>;
  private len: number;

  constructor(...items: T[]) {
    this.head = null;
    this.tail = null;
    this.len = 0;

    if (items) items.forEach((item) => this.push(item));
  }

  get size() {
    return this.len;
  }

  get front() {
    return this.head;
  }

  get back() {
    return this.tail;
  }

  get isEmpty() {
    return this.head ? false : true;
  }

  static of<T>(...items: T[]) {
    return new LinkedList<T>(...items);
  }

  static from<T>(iterable: Iterable<T>) {
    const list = new LinkedList<T>();

    for (const item of iterable) {
      list.push(item);
    }

    return list;
  }

  includes(value: T) {
    let node = this.head;

    while (node) {
      if (node.value === value) return true;

      node = node.next;
    }

    return false;
  }

  push(value: T) {
    const node = new Node(value);

    if (this.isEmpty) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }

    this.tail = node;
    this.len++;

    return value;
  }

  append(list: LinkedList<T>) {
    if (list.isEmpty) {
      return this;
    } else if (this.isEmpty) {
      this.head = list.head;
      this.tail = list.tail;
      this.len = list.len;
    } else {
      this.tail!.next = list.head;
      this.tail = list.tail;
      this.len += list.len;
    }

    return this;
  }

  pop() {
    if (this.head && this.tail) {
      let node = this.head;
      let newTail = this.head;

      while (node.next) {
        newTail = node;
        node = node.next;
      }

      newTail.next = null;
      this.tail = newTail;
      this.len--;

      return node;
    }

    return null;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  join(separator?: string) {
    let sep = separator ?? ', ';
    let node = this.head;
    let str = '';

    while (node) {
      str += `${node.value}`;
      node = node.next;

      if (node) str += sep;
    }

    return str;
  }

  toString() {
    return this.join();
  }
}
