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

    delete(value){
        this.root = this.deleteRec(this.root, value);
    }

    deleteRec(root, data){
        if(!root) return root;
        if(root.data > data) root.left = this.deleteRec(root.left, data);
        else if(root.data < data) root.right = this.deleteRec(root.right, data);
        else{
            // when root.data === data
            if(!root.left) return root.right;
            else if(!root.right) return root.left;

            // when niether of the children of root are null
            root.value = this.minValue(root.right);
            root.right = this.deleteRec(root.right, root.data);
        }
        return root;
    }

    minValue(root){
        while(root.left){
            root = root.left;
        }
        return root.data;
    }

    find(value){
        let node = this.root;
        while(node){
            if(node.data === value) break;
            if(node.data > value) node = node.left;
            else node = node.right;
        }
        return node;
    }

    levelOrder(callBack){
        const arr = [];
        const queue = [this.root];
        let node;
        while(queue.length){
            node = queue.shift();
            callBack ? callBack(node.data) : arr.push(node.data);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        return arr;
    }
}

let tree = new Tree([3,3,56,12,78,54,90,92]);
prettyPrint(tree.root);
// tree.insert(76);
// prettyPrint(tree.root);
// tree.delete(78);
// prettyPrint(tree.root);
// prettyPrint(tree.find(12));
console.log(tree.levelOrder(a => console.log(a*2)));
