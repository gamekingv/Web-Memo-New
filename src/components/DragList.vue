<template>
    <drag-item :list="list" :options="options" @change="changeHandler">
        <div :key="item.id" v-for="(item, index) in list">
            <v-hover>
                <slot :hover="hover" :item="item" slot-scope="{hover}"/>
            </v-hover>
            <v-divider :key="index" v-if="index + 1 < list.length"></v-divider>
        </div>
        <div class="ma-3 no-drag" style="text-align:center;color:rgba(255,255,255,0.7)" v-if="list.length === 0">
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
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        changeHandler: {
            type: Function
        }
    }
};
</script>
