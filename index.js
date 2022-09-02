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

    preOrder(callBack){
        const arr = [];
        this.preOrderRec(this.root, callBack, arr);
        return arr;
    }
    preOrderRec(root, callBack, arr){
        if(!root) return;
        callBack ? callBack(root.data) : arr.push(root.data);
        this.preOrderRec(root.left, callBack, arr);
        this.preOrderRec(root.right, callBack, arr);
    }

    inOrder(callBack){
        const arr = [];
        this.inOrderRec(this.root, callBack, arr);
        return arr;
    }
    inOrderRec(root, callBack, arr){
        if(!root) return;
        this.inOrderRec(root.left, callBack, arr);
        callBack ? callBack(root.data) : arr.push(root.data);
        this.inOrderRec(root.right, callBack, arr);
    }
    postOrder(callBack){
        const arr = [];
        this.postOrderRec(this.root, callBack, arr);
        return arr;
    }
    postOrderRec(root, callBack, arr){
        if(!root) return;
        this.postOrderRec(root.left, callBack, arr);
        this.postOrderRec(root.right, callBack, arr);
        callBack ? callBack(root.data) : arr.push(root.data);
    }

    height(){
        return this.heightRec(this.root);
    }
    heightRec(root){
        if(!root) return 0;
        let h1 = this.heightRec(root.left);
        let h2 = this.heightRec(root.right);
        return h1 > h2 ? h1+1 : h2+1;
    }

    depth(node){
        let temp = this.root;
        let d = 0;
        while(temp){
            if(temp.data === node.data) break;
            if(temp.data > node.data) temp = temp.left;
            else temp = temp.right;
            d++;
        }
        return d;
    }
    isBalanced(){
        return this.isBalancedRec(this.root);
    }
    isBalancedRec(root){
        if(!root) return true;
        return (this.isBalancedRec(root.left) && this.isBalancedRec(root.right) && Math.abs(this.heightRec(root.left) - this.heightRec(root.right)) <=1)
    }
    reBalance(){
        let arr = this.inOrder();
        this.root = this.buildTree(arr, 0, arr.length-1);
    }
}

let tree = new Tree([3,92,3,56,12,78,54,90]);
prettyPrint(tree.root);
console.log('Is tree balanced: ' + tree.isBalanced());
console.log('levelOrder');
console.log(tree.levelOrder());
console.log('PreOrder');
console.log(tree.preOrder());
console.log('InOrder');
console.log(tree.inOrder());
console.log('PostOrder');
console.log(tree.postOrder());
console.log('adding elements to tree');
tree.insert(116);
tree.insert(198);
tree.insert(125);
tree.insert(102);
prettyPrint(tree.root);
console.log('Is tree balanced: ' + tree.isBalanced());
console.log('Rebalancing tree..');
tree.reBalance();
prettyPrint(tree.root);
console.log('Is tree balanced: ' + tree.isBalanced());
