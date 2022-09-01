// to display tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class Node{
    constructor(data){
        this.data = data;
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

    insert(value){
        let node = this.root;
        while(true){
            if(node.data > value){
                if(node.left) node = node.left;
                else {
                    node.left = new Node(value);
                    return;
                }
            }else{
                if(node.right) node = node.right;
                else {
                    node.right = new Node(value);
                    return;
                }
            }
        }
    }
}

let tree = new Tree([3,3,56,12,78,54,90,92]);
prettyPrint(tree.root);
tree.insert(76);
prettyPrint(tree.root);
