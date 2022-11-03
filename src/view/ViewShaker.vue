<template>
    <div class="row">
        <div class="col">
            <h2><b>SHAKER</b> SORT</h2>
            <div class="tabs">
                <div class="tab">
                    <input type="radio" id="rd1" name="rd">
                    <label class="tab-label" for="rd1">Shaker sort</label>
                    <div class="tab-content">
                        void shaker_sort(int arr[], int n) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int left = 0, right = n - 1, k = 0; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;while (left &lt; right) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int i; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (i = left; i &lt; right; i++) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (arr[i] > arr[i + 1]) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(arr[i], arr[i+1]); <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k = i; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right = k; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let j; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (j = right; j > left; j--) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (arr[j] &lt; arr[j - 1]) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(arr[j], arr[j-1]); <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k = j; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left = k; <br>
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