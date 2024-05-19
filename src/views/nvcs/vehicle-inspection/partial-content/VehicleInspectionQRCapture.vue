<template>
    <p class="error" v-if="noFrontCamera">
      You don't seem to have a front camera on your device
    </p>
  
    <p class="error" v-if="noRearCamera">
      You don't seem to have a rear camera on your device
    </p>
  
    <p v-if="torchNotSupported" class="error text-danger font-italic">
      <i>Flashlight not supported for this camera.</i>
    </p>
  
    <p class="error text-danger" v-if="errorText">Error : {{ errorText }}</p>
  
    <button
      class="btn"
      @click="reload"
      :disabled="disabledButton"
      >Reload Scanner</button
    >
  
    <div
      :class="{ fullscreen: fullscreen }"
      ref="wrapper"
      @fullscreenchange="onFullscreenChange"
    >
      <qr-stream
        @decode="onDecode"
        @error="onError"
        :torch="torchActive"
        @camera-on="onCameraOn"
        v-if="!destroyed"
        v-memo="[torchActive]"
      >
        <!-- <div class="loading-indicator" v-if="loading">Loading...</div> -->
        <div class="menu-button" v-if="!destroyed">
          <!-- <div class="switch-camera">
            <button @click="switchCameras">Switch Camera</button>
          </div> -->
          <div class="torch">
            <button
              @click="torchActive = !torchActive"
              :disabled="torchNotSupported"
              class="torch-button"
            >
              <Icon
                icon="ic:outline-flashlight-on"
                width="30"
                height="30"
                style="color: white"
              />
            </button>
          </div>
        </div>
        <!-- <div class="loading-indicator" v-if="loadingProgress">
        <CSpinner />
      </div> -->
        <button
          v-if="!destroyed"
          @click="fullscreen = !fullscreen"
          class="fullscreen-button"
        >
          <Icon
            :icon="fullScreenIcon"
            width="30"
            height="30"
            style="color: white"
          />
        </button>
      </qr-stream>
    </div>
  
    {{ errorText }}
    {{ valueQr }}
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed, watch, nextTick } from 'vue'
  import { QrStream } from 'vue3-qr-reader'
  import Swal from 'sweetalert2'
  import { Icon } from '@iconify/vue'
  import { VehicleInspectionStore } from '@/stores';
  
  const loadingProgress = ref(true);
  const errorText = ref('');
  const torchActive = ref(false);
  const torchNotSupported = ref(false);
  const facingMode = ref('environment');
  const noRearCamera = ref(false);
  const noFrontCamera = ref(false);
  const fullscreen = ref(false);
  const wrapper = ref(null);
  const loading = ref(true);
  const destroyed = ref(false);
  const disabledButton = ref(false);
  const valueQr = ref('');
  
  const fullScreenIcon = computed(() => {
    if (!fullscreen.value) {
      return 'dashicons:fullscreen-alt'
    } else {
      return 'dashicons:fullscreen-exit-alt'
    }
  })
  
  const switchCameras = () => {
    switch (facingMode.value) {
      case 'environment':
        facingMode.value = 'user'
        break
      case 'user':
        facingMode.value = 'environment'
        break
    }
  }
  
  const onFullscreenChange = (event) => {
    fullscreen.value = document.fullscreenElement !== null
  }
  
  const requestFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen()
    }
  }
  
  // const exitFullscreen = () => {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen()
  //   } else if (document.mozCancelFullScreen) {
  //     /* Firefox */
  //     document.mozCancelFullScreen()
  //   } else if (document.webkitExitFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     document.webkitExitFullscreen()
  //   } else if (document.msExitFullscreen) {
  //     /* IE/Edge */
  //     document.msExitFullscreen()
  //   }
  // }
  
  // watch(fullscreen, (newValue) => {
  //   if (newValue) {
  //     requestFullscreen(wrapper.value)
  //   } else {
  //     exitFullscreen(wrapper.value)
  //   }
  // })

  const onDecode = (decodes):void => {
    const bodyNo = decodes.length > 5 ?decodes.substring(0, 5) :decodes;

    VehicleInspectionStore.bodyNo = bodyNo;
    VehicleInspectionStore.setModalQR(false);
  }
  
  // Decode Codes Scan QR - aldi.faisal@arkamaya.co.id
//   const onDecode = async (decodedCodes) => {
//     try {
//       loadingProgress.value = true
//       if (decodedCodes.length === 18) {
//         problemStore.problem.LINE_CD = await decodedCodes.slice(10, 13)
//         problemStore.problem.STATION_CD = await decodedCodes.slice(13, 15)
//         problemStore.problem.MACHINE_CD = await decodedCodes.slice(15, 18)
//         loadingProgress.value = false
//         problemStore.modalQR = false
//         problemStore.onOpenModal('insert_prob_qr')
//       } else {
//         loadingProgress.value = false
//         Swal.fire({
//           title: 'Terjadi Kesalahan!',
//           text: 'QR Code tidak dapat dideteksi, silahkan coba lagi!',
//           icon: 'error',
//           buttonsStyling: '',
//           customClass: {
//             confirmButton: 'btn btn-danger',
//           },
//         })
//       }
//     } catch (error) {
//       loadingProgress.value = false
//       Swal.fire({
//         title: `Terjadi Kesalahan! Alasan : ${error.message}`,
//         text: 'Gagal dalam Scanning QR Code',
//         icon: 'error',
//         buttonsStyling: '',
//         customClass: {
//           confirmButton: 'btn btn-danger',
//         },
//       })
//     }
//   }
  
  // Catch Errors Scan QR - aldi.faisal@arkamaya.co.id
  
  const onError = (error) => {
    const triedFrontCamera = facingMode.value === 'user'
    const triedRearCamera = facingMode.value === 'environment'
    const cameraMissingError = error.name === 'OverconstrainedError'
  
    if (triedRearCamera && cameraMissingError) {
      noRearCamera.value = true
    }
  
    if (triedFrontCamera && cameraMissingError) {
      noFrontCamera.value = true
    }
  
    if (error.name === 'NotAllowedError') {
      errorText.value = 'User denied camera access permission'
    } else if (error.name === 'NotFoundError') {
      errorText.value = 'No suitable camera device installed'
    } else if (error.name === 'NotSupportedError') {
      errorText.value = 'Page is not served over HTTPS (or localhost)'
    } else if (error.name === 'NotReadableError') {
      errorText.value = 'Maybe camera is already in use'
    } else if (error.name === 'OverconstrainedError') {
      errorText.value = 'Did you request the front camera although there is none?'
    } else if (error.name === 'StreamApiNotSupportedError') {
      errorText.value = 'Browser seems to be lacking features'
    } else if (error.name === 'InsecureContextError') {
      errorText.value =
        'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      errorText.value = error.message
    }
  }
  
  const onCameraOn = (capabilities) => {
    disabledButton.value = false
  
    loadingProgress.value = false
    torchNotSupported.value = !capabilities.torch
  }
  
  const reload = async () => {
    destroyed.value = true
    await nextTick()
    destroyed.value = false
    loading.value = true
  }
  </script>
  
  <style scoped>
  a {
    color: #42b983;
  }
  .information {
    margin-top: 100px;
  }
  
  .fullscreen {
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  
  .torch-button {
    background-color: black;
    transition: background-color 0.3s;
  }
  
  .torch-button:hover {
    background-color: #008cba;
  }
  
  .fullscreen-button {
    background-color: black;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1rem;
    transition: background-color 0.3s;
  }
  
  .fullscreen-button:hover {
    background-color: #008cba;
  }
  .fullscreen-button img {
    width: 2rem;
  }
  
  .loading-indicator {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }
  
  .btn-blue {
    --cui-btn-color: rgba(255, 255, 255, 0.87);
    --cui-btn-bg: #0d6efd;
    --cui-btn-border-color: #0d6efd;
    --cui-btn-hover-color: rgba(255, 255, 255, 0.87);
    --cui-btn-hover-bg: #619df7;
    --cui-btn-hover-border-color: #619df7;
    --cui-btn-focus-shadow-rgb: 75, 58, 223;
    --cui-btn-active-color: rgba(255, 255, 255, 0.87);
    --cui-btn-active-bg: #0d6efd;
    --cui-btn-active-border-color: #0d6efd;
    --cui-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 21, 0.125);
    --cui-btn-disabled-color: rgba(255, 255, 255, 0.87);
    --cui-btn-disabled-bg: #619df7;
    --cui-btn-disabled-border-color: #619df7;
    --cui-btn-focus-box-shadow: 0 0 0 0.2rem #ffdbde;
  }
  
  .menu-button {
    display: flex;
  }
  
  .torch {
    margin: 10px;
  }
  
  .switch-camera {
    margin: 10px;
  }
  </style>
  