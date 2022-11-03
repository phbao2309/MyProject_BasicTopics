<template>
    <div class="row">
        <div class="col">
            <h2><b>MERGE</b> SORT</h2>
            <div class="tabs">
                <div class="tab">
                    <input type="radio" id="rd1" name="rd">
                    <label class="tab-label" for="rd1">Merge</label>
                    <div class="tab-content">
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
                    </div>
                </div>

                <div class="tab">
                    <input type="radio" id="rd2" name="rd">
                    <label class="tab-label" for="rd2">Merge sort</label>
                    <div class="tab-content">
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
                    </div>
                </div>

                <div class="tab">
                    <input type="radio" id="rd3" name="rd">
                    <label class="tab-label" for="rd3">Merge sort</label>
                    <div class="tab-content">
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
                    </div>
                </div>

                <div class="tab">
                    <input type="radio" id="rd4" name="rd">
                    <label for="rd4" class="tab-close">Close others &times;</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $midnight: #2c3e50;
    $clouds: #ecf0f1;
    input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }
    // Layout
    .row {
        display:flex;
        .col {
            flex:1;
            &:last-child {
                margin-left: 1em;
            }
        }
    }
    /* Accordion styles */
    .tabs {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
    }
    .tab {
        width: 100%;
        color: white;
        overflow: hidden;
        &-label {
            display: flex;
            justify-content: space-between;
            padding: 0.5em;
            background: $midnight;
            font-weight: bold;
            cursor: pointer;
            /* Icon */
            &:hover {
                background: darken($midnight, 10%);
            }
            &::after {
                content: "\276F";
                width: 1em;
                height: 1em;
                text-align: center;
                transition: all .35s;
            }
        }
        &-content {
            max-height: 0;
            padding: 0 1em;
            color: $midnight;
            background: white;
            transition: all .35s;
        }
        &-close {
            display: flex;
            justify-content: flex-end;
            padding: 0.5em;
            font-size: 0.75em;
            background: $midnight;
            cursor: pointer;
            &:hover {
                background: darken($midnight, 10%);
            }
        }
    }

    // :checked
    input:checked {
        + .tab-label {
            background: darken($midnight, 10%);
            &::after {
                transform: rotate(90deg);
            }
        }
        ~ .tab-content {
            max-height: 100vh;
            padding: 1em;
        }
    }

</style>