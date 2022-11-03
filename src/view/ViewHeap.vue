<template>
    <div class="item">
        <p class="item-1">
            // To heapify a subtree rooted with node i which is <br>
            // an index in arr[]. n is size of heap <br>
            void heapify(int arr[], int n, int i) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int largest = i; // Initialize largest as root <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int l = 2*i + 1; // left = 2*i + 1 <br>
            &nbsp;&nbsp;&nbsp;&nbsp;int r = 2*i + 2; // right = 2*i + 2 <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;// If left child is larger than root <br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (l &lt; n && arr[l] > arr[largest]) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;largest = l; <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;// If right child is larger than largest so far <br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (r &lt; n && arr[r] > arr[largest]) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;largest = r; <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;// If largest is not root <br>
            &nbsp;&nbsp;&nbsp;&nbsp;if (largest != i) { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(arr[i], arr[largest]); <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Recursively heapify the affected sub-tree <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapify(arr, n, largest); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            } <br>
        </p>
        <p class="item-2">
            // main function to do heap sort <br>
            void heapSort(int arr[], int n) <br>
            { <br>
            &nbsp;&nbsp;&nbsp;&nbsp;// Build heap (rearrange array) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;for (int i = n / 2 - 1; i >= 0; i--) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapify(arr, n, i); <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;// One by one extract an element from heap <br>
            &nbsp;&nbsp;&nbsp;&nbsp;for (int i=n-1; i>0; i--) <br>
            &nbsp;&nbsp;&nbsp;&nbsp;{ <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Move current root to end <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(arr[0], arr[i]); <br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// call max heapify on the reduced heap <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapify(arr, i, 0); <br>
            &nbsp;&nbsp;&nbsp;&nbsp;} <br>
            } <br>
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

<!-- https://cafedev.vn/thuat-toan-heapsort-gioi-thieu-chi-tiet-va-code-vi-du-tren-nhieu-ngon-ngu-lap-trinh/ -->