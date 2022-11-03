<template>
    <div>
        <!-- <view-bubble-vue/> -->
        <!-- <view-heap-vue/> -->
        <!-- <view-insertion-vue/> -->
        <!-- <view-merge-vue/> -->
        <!-- <view-quick-vue/> -->
        <!-- <view-selection-vue/> -->
        <view-shaker-vue/>

    </div>
</template>

<script>
    import ViewBubbleVue from '../view/ViewBubble.vue';
    import ViewHeapVue from '../view/ViewHeap.vue';
    import ViewInsertionVue from '../view/ViewInsertion.vue';
    import ViewMergeVue from '../view/ViewMerge.vue';
    import ViewQuickVue from '../view/ViewQuick.vue';
    import ViewSelectionVue from '../view/ViewSelection.vue';
    import ViewShakerVue from '../view/ViewShaker.vue';

    export default {
        components: {
            ViewBubbleVue,
            ViewHeapVue,
            ViewInsertionVue,
            ViewMergeVue,
            ViewQuickVue,
            ViewSelectionVue,
            ViewShakerVue
        }
    }
</script>