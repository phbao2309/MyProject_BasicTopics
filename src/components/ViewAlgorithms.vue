<template>
    <div>
        <view-heap-vue 
            v-if="statusChoiceAlogirthm === 'heap'" 
        />
        <view-merge-vue 
            v-if="statusChoiceAlogirthm === 'merge'"
        />
        <view-quick-vue 
            v-if="statusChoiceAlogirthm === 'quick'"
        />
        <view-bubble-vue 
            v-if="statusChoiceAlogirthm === 'bubble'"
        />
        <view-shaker-vue 
            v-if="statusChoiceAlogirthm === 'shaker'"
        />
        <view-selection-vue 
            v-if="statusChoiceAlogirthm === 'selection'"
        />
        <view-insertion-vue 
            v-if="statusChoiceAlogirthm === 'insertion'"
        />
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
        props: ['statusChoiceAlogirthm'],
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