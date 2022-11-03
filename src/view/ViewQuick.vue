<template>
    <div class="item">
        <p class="item-1">
            int findpivot(int arr[], int i, int j) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;let firstkey = arr[i]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;let k = i + 1; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;while ((k &lt;= j) && (arr[k] === firstkey)) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (k > j) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return -1; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} else if (arr[k] > firstkey) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return k; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} else { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return i; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            }
        </p>
        <p class="item-2">
            int partition(int arr[], int i, int j, int pivot) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;let L = i; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;let R = j; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;while (L &lt; R) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while (arr[L] &lt; pivot) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swhile (arr[R] >= pivot) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R--; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (L &lt; R) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// swap <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let temp = arr[L]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[L] = arr[R]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[R] = temp; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;return L; <br>
            }
        </p>
        <p class="item-3">
            void quicksort(int arr[], int i, int j) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int pivot; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int k; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int pivotidx = findpivot(arr, i, j); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (pivotidx != -1) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pivot = arr[pivotidx]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k = await partition(arr, i, j, pivot); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quicksort(arr, i, k-1); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quicksort(arr, k, j); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            }
        </p>
    </div>
    
</template>

<style scoped>
    .item {
        display: flex;
    }

    .item-2 {
        margin-right: 20px;
        margin-left: 20px;
    }
</style>