<template>
    <div class="row">
        <div class="col">
            <h2><b>BUBBLE</b> SORT</h2>
            <div class="tabs">
                <div class="tab">
                    <input type="radio" id="rd1" name="rd">
                    <label class="tab-label" for="rd1">Bubble sort</label>
                    <div class="tab-content">
                        void BubbleSort(int a[], int n){ <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;int temp; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; n; i++){ <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (int j = i + 1; j &lt; n; j++){ <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (a[j] > a[j+1]){ <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp = a[j]; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a[j] = a[j+1]; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a[j+1] = temp; <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;} <br>
                        } <br>
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