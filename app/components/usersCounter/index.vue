<template>
  <div class="relative">
    <Button
      icon="pi pi-users !font-bold "
      class="w-10 h-10 !border-2 rounded-xl"
      @click="popoverRef.toggle($event)"
    />
    <Badge
      :value="store.remainingPoints.toString()"
      size="small"
      severity="contrast"
      class="absolute h-5 w-5 -bottom-1 right-0 rounded-full"
    />
  </div>
  <Popover ref="popoverRef">
    <Card unstyled class="min-w-[35vw]">
      <template #title>
        <div class="flex items-center justify-between">
          <p class="font-semibold">
            <i class="pi pi-briefcase pl-2" />
            Vendedores ({{ store.sellers.length }})
          </p>
          <Button
            size="small"
            icon="pi pi-times"
            variant="text"
            @click="popoverRef.toggle($event)"
          />
        </div>
      </template>
      <template #content>
        <div class="w-full flex flex-col items-center justify-center my-3">
          <span>Puntos restantes</span>
          <span>{{ store.remainingPoints }}</span>
        </div>
        <Listbox
          :options="
            Array.from(store.sellers).sort(
              ({ points: aPoints = 0 }, { points: bPoints = 0 }) =>
                bPoints - aPoints
            )
          "
          filter
          optionLabel="name"
          class="w-full border-none mt-5 bg-[var(--p-popover-background)] p-2"
          emptyFilterMessage="No se encontraron vendedores"
          emptyMessage="No hay vendedores"
          filterPlaceholder="Buscar vendedor..."
          pt:pcFilter:class="bg-[var(--p-popover-background)]"
        >
          <template #option="slotProps">
            <div class="flex items-center justify-between w-full">
              <div>{{ slotProps.option.name }}</div>
              <div class="ml-6">
                <i class="pi pi-trophy text-yellow-500" />
                {{ slotProps.option.points ?? 0 }}
              </div>
            </div>
          </template>
        </Listbox>
      </template>
      <template #footer>
        <Button
          icon="pi pi-refresh"
          label="Reiniciar puntuación"
          class="w-full"
          @click="resetCounter()"
        />
      </template>
    </Card>
  </Popover>
</template>

<script lang="ts" setup>
const popoverRef = ref();

const store = useSalesStore();

const confirm = useConfirm();
const toast = useToast();

const resetCounter = () => {
  confirm.require({
    message: "¿Está seguro de reiniciar la puntuación de todos los vendedores?",
    header: "Reiniciar puntuación",
    rejectProps: {
      label: "Cancelar",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Reiniciar",
      severity: "danger",
    },
    accept: () => {
      store.resetSellers();
      toast.add({
        severity: "success",
        summary: "Reiniciar puntuación",
        detail: "La puntuación de todos los vendedores ha sido reiniciada.",
        life: 3000,
      });
    },
  });
};
</script>

<style scoped></style>
