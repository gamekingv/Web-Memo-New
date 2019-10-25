<template>
    <drag-item :animation="100" :group="group" :list="list" @change="changeHandler" filter=".no-drag">
        <div :key="item.id" v-for="(item, index) in list">
            <v-hover>
                <slot :hover="hover" :item="item" slot-scope="{hover}" />
            </v-hover>
            <v-divider :key="index" v-if="index + 1 < list.length"></v-divider>
        </div>
        <div class="ma-3 no-drag blank-panel" style="text-align:center;color:rgba(255,255,255,0.7)">
            <slot name="blank-text"></slot>
        </div>
    </drag-item>
</template>
<script>
import dragItem from 'vuedraggable';

export default {
    name: 'dragList',
    components: {
        dragItem
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        changeHandler: Function,
        group: String
    }
};
</script>

<style scoped>
.blank-panel {
    display: none;
}
.blank-panel:only-child {
    display: unset;
}
</style>
