const two = 2;
function heapSort(arr){
    let len = arr.length,
        end = len-1;

    heapify(arr, len);

    while(end > 0){
        swap(arr, end--, 0);
        siftDown(arr, 0, end);
    }
    return arr;
}
function heapify(arr, len){
    let mid = Math.floor(len/two);
    while(mid >= 0){
        siftDown(arr, mid--, len-1);
    }
}
function siftDown(arr, start, end){
    let root = start,
        child = root*two + 1,
        toSwap = root;
    while(child <= end){
        if(arr[toSwap] < arr[child]){
            toSwap = child;
        }
        if(child+1 <= end && arr[toSwap] < arr[child+1]){
            toSwap = child+1;
        }
        if(toSwap !== root){
            swap(arr, root, toSwap);
            root = toSwap;
        } else{
            return;
        }
        toSwap = root;
        child = root*two+1
    }
}

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}





