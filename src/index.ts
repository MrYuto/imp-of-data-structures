import LinkedList from './LinkedList';

const list: LinkedList<number> = new LinkedList(1, 2);
const list2: LinkedList<number> = LinkedList.of(3, 4, 5);

console.log(`
    list: ${list}
    list2: ${list2}
`);

list.append(list2);

console.log(list.toString());

const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join();