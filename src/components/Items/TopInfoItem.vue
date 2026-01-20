<script>
export default {
  props: ["data", "position"],
  computed: {
    rank() {
      return this.position + 1;
    },
    rankColor() {
      if (this.rank === 1) return "text-yellow-400";
      if (this.rank === 2) return "text-slate-300";
      if (this.rank === 3) return "text-amber-600";
      return "text-neutral-500";
    },
    rankBg() {
      if (this.rank === 1) return "bg-yellow-400/10 border-yellow-400/20";
      if (this.rank === 2) return "bg-slate-300/10 border-slate-300/20";
      if (this.rank === 3) return "bg-amber-600/10 border-amber-600/20";
      return "bg-neutral-800 border-neutral-700";
    },
    formattedScore() {
      return this.data.score.toLocaleString();
    },
  },
};
</script>

<template>
  <div
    class="flex items-center justify-between p-4 rounded-md border transition-all duration-300 group hover:border-emerald-500/50 hover:bg-neutral-800 relative overflow-hidden"
    :class="[
      rank <= 3 ? 'bg-neutral-900' : 'bg-neutral-900/50',
      rank <= 3 ? 'border-neutral-700' : 'border-neutral-800',
    ]"
    data-aos="fade-up"
    :data-aos-delay="rank * 50"
  >
    <div class="flex items-center gap-4 relative z-10">
      <div
        class="flex items-center justify-center w-12 h-12 rounded-md border font-bold text-lg shrink-0"
        :class="[rankBg, rankColor]"
      >
        <font-awesome-icon
          v-if="rank === 1"
          :icon="['fas', 'trophy']"
          class="text-sm"
        />
        <span v-else>#{{ rank }}</span>
      </div>

      <div class="flex flex-col">
        <span
          class="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1"
        >
          Jogador
        </span>
        <span class="text-white font-bold text-lg md:text-xl tracking-tight">
          {{ data.name }}
        </span>
      </div>
    </div>

    <div class="relative z-10 flex items-center gap-4 md:gap-8">
      <div class="flex flex-col items-end">
        <span
          class="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1"
        >
          Pontuação
        </span>
        <span class="text-emerald-400 font-mono font-bold text-lg md:text-xl">
          {{ formattedScore }}
        </span>
      </div>

      <div
        class="text-neutral-600 group-hover:text-emerald-500 transition-colors duration-300 hidden sm:block"
      >
        <font-awesome-icon :icon="['fas', 'gamepad']" class="text-xl" />
      </div>
    </div>

    <div
      v-if="rank === 1"
      class="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-transparent pointer-events-none"
    ></div>
    <div
      v-if="rank === 2"
      class="absolute inset-0 bg-gradient-to-r from-slate-300/5 via-transparent to-transparent pointer-events-none"
    ></div>
    <div
      v-if="rank === 3"
      class="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-transparent to-transparent pointer-events-none"
    ></div>
  </div>
</template>
