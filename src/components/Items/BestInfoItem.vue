<script>
export default {
  props: ["score", "position"],
  computed: {
    rankColor() {
      if (this.position === 1) return "text-yellow-400";
      if (this.position === 2) return "text-slate-300";
      if (this.position === 3) return "text-amber-600";
      return "text-neutral-500";
    },
    rankBg() {
      if (this.position === 1) return "bg-yellow-400/10 border-yellow-400/20";
      if (this.position === 2) return "bg-slate-300/10 border-slate-300/20";
      if (this.position === 3) return "bg-amber-600/10 border-amber-600/20";
      return "bg-neutral-800 border-neutral-700";
    },
    formattedScore() {
      return this.score.toLocaleString();
    },
  },
};
</script>

<template>
  <div
    class="flex items-center justify-between p-4 rounded-md border transition-all duration-300 group hover:border-emerald-500/50 hover:bg-neutral-800 relative overflow-hidden"
    :class="[
      position <= 3 ? 'bg-neutral-900' : 'bg-neutral-900/50',
      position <= 3 ? 'border-neutral-700' : 'border-neutral-800',
    ]"
    data-aos="fade-up"
    :data-aos-delay="position * 50"
  >
    <!-- Rank Indicator -->
    <div class="flex items-center gap-4 relative z-10">
      <div
        class="flex items-center justify-center w-12 h-12 rounded-md border font-bold text-lg"
        :class="[rankBg, rankColor]"
      >
        <font-awesome-icon
          v-if="position === 1"
          :icon="['fas', 'trophy']"
          class="text-sm"
        />
        <span v-else>#{{ position }}</span>
      </div>

      <div class="flex flex-col">
        <span
          class="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1"
          >Pontuação Final</span
        >
        <span class="text-white font-bold text-xl font-mono tracking-tight">{{
          formattedScore
        }}</span>
      </div>
    </div>

    <!-- Visual Decoration -->
    <div class="relative z-10 flex items-center gap-4">
      <div
        v-if="position === 1"
        class="text-[10px] font-bold px-2 py-1 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 uppercase tracking-wider hidden sm:block"
      >
        Recorde Atual
      </div>
      <div
        class="text-neutral-600 group-hover:text-emerald-500 transition-colors duration-300"
      >
        <font-awesome-icon :icon="['fas', 'stopwatch']" class="text-xl" />
      </div>
    </div>

    <!-- Background Gradient for Top Ranks -->
    <div
      v-if="position === 1"
      class="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-transparent pointer-events-none"
    ></div>
  </div>
</template>
