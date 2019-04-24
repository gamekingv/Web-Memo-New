<template>
    <v-app dark>
        <v-tabs color="grey darken-4" fixed-tabs slider-color="blue" v-model="model">
            <v-tab :key="n" ripple v-for="n in 3">Item {{ n }}</v-tab>
        </v-tabs>
        <v-flex style="overflow:hidden;">
            <v-tabs-items class="tab-items-row" v-model="model">
                <v-tab-item :key="n" v-for="n in 3">
                    <anime :day="n" :key="n" v-for="n in 7"/>
                </v-tab-item>
            </v-tabs-items>
        </v-flex>
    </v-app>
</template>

<script>
import Anime from './components/Anime';

export default {
    name: 'App',
    components: {
        Anime
    },
    data() {
        return {
            model: 0
        };
    }
};
</script>

<style scoped>
.tab-items-row,
.tab-items-row >>> .v-window__container,
.tab-items-row >>> .v-window-item {
    height: 100%;
    overflow-y: auto;
}
</style>