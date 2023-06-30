<template>
    <div v-if="type == 'pri'" class="btn1">
        <slot></slot>
    </div>
    <div v-else-if="type == 'dan'" class="btn2">
        <slot></slot>
    </div>
</template>

<script lang="tsx" setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: () => 'pri'
    },
    
})
</script>

<style lang="scss" scoped>
$color: #0ebeff;
@mixin btn {
    z-index: 2003;
    width: 80px;
    height: 40px;
    line-height: 40px;
    color: $color;
    font-size: 24px;
    border-radius: 10px;
    text-align: center;
    margin: auto;
    transform: translateY(-40px);
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    -webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, 0.4));

    &:hover {
        color: #fff;
        box-shadow: 0 0 5px $color, 0 0 25px $color;

        &::after,
        &::before {
            transition: 0.3s;
            background-color: $color;
        }
    }

    &::before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        z-index: -2;
        left: 50%;
        top: 50%;
        width: 150%;
        height: 300%;
        transform: translate(-50%, -50%);
        background-color: #000;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: 0 0;
        background-image: conic-gradient($color, $color);
        animation: rotate 2s linear infinite;
    }
}

.btn1 {
    @include btn;

    &::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        z-index: -1;
        left: 2px;
        top: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: #000;
        border-radius: 10px;
    }
}

.btn2 {
    @include btn;
    filter: hue-rotate(90deg);
}

@keyframes rotate {
    100% {
        transform: translate(-50%, -50%) rotate(1turn);
    }
}
</style>