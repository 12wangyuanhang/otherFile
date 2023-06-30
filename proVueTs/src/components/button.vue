<template>
    <div class="btn-common" :class="type">
        <slot></slot>
    </div>
</template>

<script lang="tsx" setup>
    import { ref, defineProps, onMounted, nextTick } from 'vue';
    const props = defineProps({
        type: {
            type: String,
            default: () => 'info'
        },
    })
    onMounted(()=>{
        nextTick(()=>{
            const buttons = document.querySelector('.btn-common') as Element;
            buttons.addEventListener('click', function (e: any) {
                const target = e.target as HTMLElement;
                let x = e.clientX - target.offsetLeft;
                let y = e.clientY - target.offsetTop;
                let ripples = document.createElement('span');
                ripples.className = 'ripples';
                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';
                buttons.appendChild(ripples)
                setTimeout(() => {
                    ripples.remove()
                }, 1000)
            })
        })
    })


</script>
<style lang="scss">
    @keyframes animated {
        0% {
            width: 0;
            height: 0;
            opacity: 0.5;
        }

        100% {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
    .ripples {
        position: absolute;
        background: #fff;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        animation: animated 1s linear infinite;
    }
    .btn-common {
        &:hover{
            animation: grennLight 2s infinite linear alternate ;
        }
    }
    @keyframes grennLight {
        from {
            text-shadow: 0px 0px 1px #fff,0px 0px 8px #91bb8d,0px 0px 16px #91bb8d,0px 0px 32px #91bb8d,0px 0px 64px #91bb8d,0px 0px 128px #91bb8d;
        }
        to {
            text-shadow: 0px 0px 2px #fff,0px 0px 16px #91bb8d,0px 0px 30px #91bb8d,0px 0px 70px #91bb8d,0px 0px 150px #91bb8d,0px 0px 310px #91bb8d;
            filter: brightness(1.5);
        }
    }
</style>
<style scoped>
    .btn-common {
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        margin: 5px 10px;
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 2px;
        border-radius: 40px;
        overflow: hidden;
        cursor: pointer;
        font-family: 'AndilanteriaSignature';
    }
    
    .default {
        background: linear-gradient(90deg, #0162c8, #55e7fc);
    }
    .primary {
        background: linear-gradient(90deg, #755bea, #ff72c0);
    }
    .success {
        background: linear-gradient(90deg, #7ed47d, #3fc2a0);
    }
    .info {
        background: linear-gradient(90deg, #30cfd0, #330867);
    }
    

    

</style>