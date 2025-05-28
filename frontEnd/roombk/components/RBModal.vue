<template>
    <UModal :modal-value="isOpen" :overlay="false" title="Booking Room" >
        <div calss="p-4">
            <p><strong>Start:</strong> {{ formatDate(start) }}</p>
            <p><strong>End:</strong> {{ formatDate(start) }}</p>
        </div>
    <UButton label="Confirm" color="primary" variant="subtle"/>
    <UButton label="Confirm" color="primary" variant="subtle"/>
    
  </UModal>
</template>

<script>

</script>
