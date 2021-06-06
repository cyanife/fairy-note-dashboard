import Vue from 'vue';
import Barrage from '@/components/common/barrage';
import BarrageRecent from '@/components/common/barrage-recent';

Vue.component('Chart', resolve => require(['@/components/common/chart'], resolve));
Vue.component('Barrage', Barrage);
Vue.component('BarrageRecent', BarrageRecent);
