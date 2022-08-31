class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        arr = Array.from(new Set(arr)).sort((a,b) => a-b);
        this.root = this.buildTree(arr, 0, arr.length -1);
    }

    buildTree(arr, start, end){
        if(start > end) return;
        let mid = parseInt((start+end)/2);
        let node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid-1);
        node.right = this.buildTree(arr, mid+1, end);
        return node;
    }
}
let tree = new Tree([3,3,56,12,78,54,90,92]);
console.log(tree.root);
