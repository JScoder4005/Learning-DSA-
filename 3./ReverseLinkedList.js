// Reverse a singly linked list in-place.
// Time: O(n) | Space: O(1)

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // save next before overwriting
    curr.next = prev;       // reverse the pointer
    prev = curr;            // move prev forward
    curr = next;            // move curr forward
  }

  return prev; // prev is now the new head
}

// Helper: build list from array
function buildList(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], head);
  }
  return head;
}

// Helper: print list as array
function printList(head) {
  const result = [];
  while (head) { result.push(head.val); head = head.next; }
  return result;
}

console.log(printList(reverseList(buildList([1, 2, 3, 4, 5])))); // [5,4,3,2,1]
console.log(printList(reverseList(buildList([1, 2]))));           // [2,1]
console.log(printList(reverseList(buildList([]))));               // []
