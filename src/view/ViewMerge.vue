<template>
    <div class="row">
        <div class="col">
            <h2><b>MERGE</b> SORT</h2>
            <div class="tabs">
                <div class="tab">
                    <input type="radio" id="rd1" name="rd">
                    <label class="tab-label" for="rd1">Merge</label>
                    <div class="tab-content">
                        void merge(int arr[], int l, int m, int r) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int i, j, k; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int n1 = m - l + 1; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int n2 = r - m; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int L[n1], R[n2]; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i &lt; n1; i++) L[i] = arr[l + i];<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;for (j = 0; j &lt; n2; j++) R[j] = arr[m + 1 + j]; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;i = 0; j = 0; k = l; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;while (i &lt; n1 && j &lt; n2) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (L[i] &lt;= R[j]) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = L[i]; i++;<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = R[j]; j++;<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k++; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;while (i &lt; n1) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = L[i]; i++; k++;<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;while (j &lt; n2) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[k] = R[j]; j++; k++;<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        } <br>
                    </div>
                </div>

                <div class="tab">
                    <input type="radio" id="rd2" name="rd">
                    <label class="tab-label" for="rd2">Merge sort</label>
                    <div class="tab-content">
                        void mergeSort(int arr[], int l, int r) {<br>  
                        &nbsp;&nbsp;&nbsp;&nbsp;if (l &lt; r) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int m = l + (r - l) / 2; <br>
                        <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mergeSort(arr, l, m); <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mergeSort(arr, m + 1, r); <br>
                        <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;merge(arr, l, m, r); <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        }
                    </div>
                </div>

                <div class="tab">
                    <input type="radio" id="rd3" name="rd">
                    <label for="rd3" class="tab-close">Close others &times;</label>
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

