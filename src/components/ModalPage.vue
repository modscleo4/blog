<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    show: Boolean
});

const emits = defineEmits([
    'show',
    'close',
    'closeAndBack',
]);

watch(() => props.show, () => {
    if (props.show) {
        document.querySelector('body')?.classList?.add('modal-open');
        emits('show');
    } else {
        document.querySelector('body')?.classList?.remove('modal-open');
        emits('close');
    }
});
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @click="$emit('close'); $emit('closeAndBack')">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop="">
                    <div class="modal-header">
                        <slot name="header">

                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    height: 100%;
}

.modal-container {
    width: 1200px;
    height: 100%;
    margin: 0px auto;
    /* padding: 16px 32px; */
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    display: grid;
    grid-template-rows: min-content auto min-content;
    max-height: 100vh;
}

.modal-body {
    /* margin: 20px 0; */
    overflow: auto;
}

.modal-footer {
    padding: 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
