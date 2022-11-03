<template>
    <div class="row">
        <div class="col">
            <h2><b>INSERTION</b> SORT</h2>
            <div class="tabs">
                <div class="tab">
                    <input type="radio" id="rd1" name="rd">
                    <label class="tab-label" for="rd1">Insertion sort</label>
                    <div class="tab-content">
                        void insertionSort(int arr[], int n) <br>
                        { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int i, key, j; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;for (i = 1; i &lt; n; i++) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key = arr[i]; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j = i - 1; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while (j >= 0 && arr[j] > key) { <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j + 1] = arr[j]; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j = j - 1; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j + 1] = key; <br>
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