/* Presentational dashboard. All account and progress values are supplied by the app. */
(function (root) {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value))) : 0;
  const format = value => number(value).toLocaleString('fr-FR');
  const color = value => /^#[0-9a-f]{3,8}$/i.test(String(value)) ? value : '#b4ef99';
  function charts(data = {}) {
    const activity = Array.isArray(data.activity) ? data.activity.slice(-7) : [];
    const tracks = Array.isArray(data.trackStats) ? data.trackStats : [];
    const peak = Math.max(1, ...activity.map(day => number(day.count)));
    const weeklyMissions = activity.reduce((sum, day) => sum + number(day.count), 0);
    const weeklyXP = activity.reduce((sum, day) => sum + number(day.xp), 0);
    return `<section class="premium-insights" aria-label="Tes statistiques d’apprentissage">
      <article class="premium-panel activity-panel"><div class="premium-panel-heading"><div><p class="premium-kicker">UNE HABITUDE QUI SE CONSTRUIT</p><h2>Chaque jour compte.</h2></div><span class="premium-period">7 derniers jours</span></div>
      <div class="activity-summary"><strong>${format(weeklyMissions)} <span>mission${weeklyMissions > 1 ? 's' : ''}</span></strong><span>+${format(weeklyXP)} XP cette semaine</span></div>
      <div class="activity-chart" role="img" aria-label="Missions terminées par jour : ${escape(activity.map(day => `${day.label} ${number(day.count)}`).join(', '))}">${activity.map(day => `<div class="activity-column" title="${escape(day.date)} : ${number(day.count)} mission(s), ${number(day.xp)} XP"><span class="activity-value">${format(day.count)}</span><div class="activity-track"><span style="height:${number(day.count) / peak * 100}%"></span></div><span class="activity-day">${escape(day.label)}</span></div>`).join('')}</div>
      <p class="premium-footnote">Les missions terminées alimentent ce graphique. Un même défi ne compte qu’une fois.</p></article>
      <article class="premium-panel coverage-panel"><div class="premium-panel-heading"><div><p class="premium-kicker">TES TROIS SUPER-POUVOIRS</p><h2>Ton terrain de jeu.</h2></div><span class="coverage-mark" aria-hidden="true">◈</span></div>
      <div class="track-coverage">${tracks.map(track => { const done = number(track.done), total = number(track.total), percent = total ? Math.min(100, Math.round(done / total * 100)) : 0; return `<div class="coverage-row"><div class="coverage-label"><span><i style="background:${color(track.color)}"></i>${escape(track.title)}</span><strong>${done}<small> / ${total}</small></strong></div><div class="coverage-track" role="progressbar" aria-label="Progression ${escape(track.title)}" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent}%;background:${color(track.color)}"></span></div></div>`; }).join('')}</div>
      <div class="coverage-note"><span aria-hidden="true">✦</span><p>Apprends une notion.<br><strong>Transforme-la en quelque chose de concret.</strong></p></div></article>
    </section>`;
  }
  function dashboard(data = {}) {
    const completed = number(data.completed), total = number(data.total), mission = data.nextMission || {};
    const goal = Math.max(1, number(data.goal)), today = number(data.todayCount), goalPercent = Math.min(100, Math.round(today / goal * 100));
    const nextAction = mission.id ? `data-action="mission" data-id="${escape(mission.id)}"` : 'data-action="navigate" data-view="map"';
    const metrics = [
      ['✦', 'Expérience accumulée', format(data.xp), 'XP gagnés en terminant tes missions', 'mint'],
      ['✓', 'Missions accomplies', `${completed}<small> / ${total}</small>`, 'Des idées comprises et mises en pratique', 'lavender'],
      ['ϟ', 'Ta série actuelle', `${format(data.streak)}<small> jour${number(data.streak) > 1 ? 's' : ''}</small>`, 'Une mission terminée fait vivre la série', 'amber'],
      ['◈', 'Niveau d’explorateur', String(Math.max(1, number(data.playerLevel))), 'Ton niveau évolue avec tes XP', 'blue']
    ];
    return `<div class="premium-welcome"><div><p class="premium-kicker">TON AVENTURE, TOUJOURS AVEC TOI</p><h1>Bon retour, <span>${escape(data.name || 'explorateur')}</span> <i aria-hidden="true">✦</i></h1><p>Un petit pas aujourd’hui. Une nouvelle capacité pour demain.</p></div><div class="account-chip"><span class="account-avatar" aria-hidden="true">${escape(data.avatar || '🤖')}</span><div><strong>Ton espace personnel</strong><span class="sync-status">${escape(data.syncLabel || 'État de la synchronisation')}</span></div></div></div>
      <section class="premium-hero"><img src="assets/quest-world.webp" alt="Trois îles de programmation attendent ton prochain défi"><div class="premium-hero-copy"><span class="premium-hero-tag">${escape(String(mission.track || 'CODE').toUpperCase())} / TA PROCHAINE QUÊTE</span><h2>Le prochain déclic<br><span>est à une mission.</span></h2><p>${escape(mission.title || 'Explore la carte et choisis ton prochain défi.')}</p><div class="premium-mission-meta">${mission.estimatedMinutes ? `<span>◷ ${number(mission.estimatedMinutes)} min</span>` : ''}${mission.xp ? `<span>✦ +${number(mission.xp)} XP</span>` : ''}<span>À ton rythme</span></div><button class="button primary" ${nextAction}>Continuer mon aventure <span>→</span></button></div><div class="premium-goal"><span class="premium-goal-icon" aria-hidden="true">${today >= goal ? '✓' : '✧'}</span><div><small>OBJECTIF DU JOUR</small><strong>${Math.min(today, goal)} / ${goal} mission${goal > 1 ? 's' : ''}</strong><div class="premium-goal-track" role="progressbar" aria-label="Objectif quotidien" aria-valuenow="${goalPercent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${goalPercent}%"></span></div></div></div></section>
      <section class="premium-metrics" aria-label="Ta progression en chiffres">${metrics.map(([icon, label, value, note, tone]) => `<article class="premium-metric ${tone}"><div class="metric-heading"><span>${label}</span><i aria-hidden="true">${icon}</i></div><strong>${value}</strong><p>${note}</p></article>`).join('')}</section>
      ${charts(data)}`;
  }
  const api = { dashboard, charts };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QuestPremium = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
