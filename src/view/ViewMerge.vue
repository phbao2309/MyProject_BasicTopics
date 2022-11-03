<template>
    <div class="item">
        <p class="item-1">
            // Merges two subarrays of arr[]. <br>
            // First subarray is arr[l..m] <br>
            // Second subarray is arr[m+1..r] <br>
            void merge(int arr[], int l, int m, int r) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int i, j, k; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int n1 = m - l + 1; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int n2 = r - m; <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;/* create temp arrays */ <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int L[n1], R[n2]; <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;/* Copy data to temp arrays L[] and R[] */ <br>
            &nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i &lt; n1; i++) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L[i] = arr[l + i]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;for (j = 0; j &lt; n2; j++) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R[j] = arr[m + 1 + j]; <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;/* Merge the temp arrays back into arr[l..r]*/ <br>
            &nbsp;&nbsp;&nbsp;&nbsp;i = 0; // Initial index of first subarray <br>
            &nbsp;&nbsp;&nbsp;&nbsp;j = 0; // Initial index of second subarray <br>
            &nbsp;&nbsp;&nbsp;&nbsp;k = l; // Initial index of merged subarray <br>
            &nbsp;&nbsp;&nbsp;&nbsp;while (i &lt; n1 && j &lt; n2) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (L[i] &lt;= R[j]) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = L[i]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = R[j]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;/* Copy the remaining elements of L[], if there <br>
            &nbsp;&nbsp;&nbsp;&nbsp;are any */ <br>
            &nbsp;&nbsp;&nbsp;&nbsp;while (i &lt; n1) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = L[i]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;/* Copy the remaining elements of R[], if there <br>
            &nbsp;&nbsp;&nbsp;&nbsp;are any */ <br>
            &nbsp;&nbsp;&nbsp;&nbsp;while (j &lt; n2) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = R[j]; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k++; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            } <br>
        </p>
        <p class="item-2">
            /* l is for left index and r is right index of the <br>
            sub-array of arr to be sorted */ <br>
            void mergeSort(int arr[], int l, int r) {<br>  
            &nbsp;&nbsp;&nbsp;&nbsp;if (l &lt; r) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Same as (l+r)/2, but avoids overflow for <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// large l and h <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int m = l + (r - l) / 2; <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Sort first and second halves <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mergeSort(arr, l, m); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mergeSort(arr, m + 1, r); <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;merge(arr, l, m, r); <br>
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
        margin-left: 20px;
    }
</style>