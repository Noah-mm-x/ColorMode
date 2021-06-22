import { ref } from 'vue'
export function cashPopupFnc() {
  const cashPopupRef = ref(null)
  const handleCashShow = () => {
    cashPopupRef.value.handleShow()
  }
  return { cashPopupRef ,handleCashShow}
}
export function payPopupFnc() {
  const payPopupRef = ref(null)
  const handlePayShow = () => {
    payPopupRef.value.handleShow()
  }
  return { payPopupRef ,handlePayShow}
}